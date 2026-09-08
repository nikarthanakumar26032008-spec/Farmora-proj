import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

app = FastAPI(title="Farmora Crop Profit Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "ml/models/crop_profit_model.pkl"
model_payload = None

def load_model():
    global model_payload
    if os.path.exists(MODEL_PATH):
        model_payload = joblib.load(MODEL_PATH)
        print("ML Model loaded successfully.")
    else:
        print("Warning: Model file not found. Please run train_model.py first.")

@app.on_event("startup")
def startup_event():
    load_model()

class PredictionRequest(BaseModel):
    season: str
    location: str
    land_area: float

@app.get("/")
def health_check():
    return {"status": "ok", "service": "Farmora ML Engine"}

@app.post("/predict")
def predict_crop_profit(req: PredictionRequest):
    global model_payload
    if not model_payload:
        load_model()
        if not model_payload:
            raise HTTPException(status_code=500, detail="ML model is not trained/loaded.")

    season_input = req.season.strip()
    location_input = req.location.strip()
    land_area = float(req.land_area) if req.land_area > 0 else 1.0

    df = pd.DataFrame(model_payload['dataset_summary'])
    le_season = model_payload['le_season']
    le_crop = model_payload['le_crop']
    le_location = model_payload['le_location']
    
    rf_profit = model_payload['rf_profit']
    rf_yield = model_payload['rf_yield']
    rf_cost = model_payload['rf_cost']
    rf_price = model_payload['rf_price']

    # Get available crops in dataset
    all_crops = list(df['Crop'].unique())
    
    predictions = []

    for crop in all_crops:
        # Check if crop has dataset encoding or match
        try:
            season_enc = le_season.transform([season_input])[0] if season_input in le_season.classes_ else 0
            crop_enc = le_crop.transform([crop])[0]
            location_enc = le_location.transform([location_input])[0] if location_input in le_location.classes_ else 0
            
            features = pd.DataFrame([{
                'Season_Enc': season_enc,
                'Crop_Enc': crop_enc,
                'Location_Enc': location_enc,
                'Land_Area': land_area
            }])

            est_profit = float(rf_profit.predict(features)[0])
            est_yield = float(rf_yield.predict(features)[0])
            est_cost = float(rf_cost.predict(features)[0])
            est_price = float(rf_price.predict(features)[0])

            # Retrieve demand & water requirements from historical data or defaults
            crop_rows = df[df['Crop'] == crop]
            demand = crop_rows['Demand'].values[0] if not crop_rows.empty else "HIGH"
            water = crop_rows['Water_Requirement'].values[0] if not crop_rows.empty else "Medium"

            cost_per_acre = round(est_cost / land_area, 2)
            yield_per_acre = round(est_yield / land_area, 2)
            revenue_per_acre = round((est_yield * est_price) / land_area, 2)
            profit_per_acre = round(est_profit / land_area, 2)

            predictions.append({
                "crop": crop,
                "estimated_cost_per_acre": cost_per_acre,
                "expected_yield_per_acre": yield_per_acre,
                "expected_revenue_per_acre": revenue_per_acre,
                "estimated_profit_per_acre": profit_per_acre,
                "total_estimated_profit": round(est_profit, 2),
                "total_estimated_cost": round(est_cost, 2),
                "market_price_per_kg": round(est_price, 2),
                "demand": demand,
                "water_requirement": water
            })
        except Exception as e:
            continue

    if not predictions:
        raise HTTPException(status_code=400, detail="No predictions could be generated for the given inputs.")

    # Sort predictions by estimated profit descending
    predictions.sort(key=lambda x: x['total_estimated_profit'], reverse=True)
    recommended = predictions[0]

    return {
        "inputs": {
            "season": season_input,
            "location": location_input,
            "land_area": land_area
        },
        "recommended_crop": recommended,
        "all_recommendations": predictions
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
