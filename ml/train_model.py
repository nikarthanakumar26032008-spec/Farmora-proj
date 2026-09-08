import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib

def train_and_save():
    os.makedirs("ml/models", exist_ok=True)
    df = pd.read_csv("ml/data/crop_profit_dataset.csv")

    print(f"Loaded dataset with {len(df)} records.")

    # Categorical encoders
    le_season = LabelEncoder()
    le_crop = LabelEncoder()
    le_location = LabelEncoder()

    df['Season_Enc'] = le_season.fit_transform(df['Season'])
    df['Crop_Enc'] = le_crop.fit_transform(df['Crop'])
    df['Location_Enc'] = le_location.fit_transform(df['Location'])

    # Features & Targets
    # Input: Season, Crop, Location, Land_Area
    X = df[['Season_Enc', 'Crop_Enc', 'Location_Enc', 'Land_Area']]

    y_profit = df['Profit']
    y_yield = df['Expected_Yield']
    y_cost = df['Production_Cost']
    y_price = df['Market_Price']

    rf_profit = RandomForestRegressor(n_estimators=50, random_state=42)
    rf_profit.fit(X, y_profit)

    rf_yield = RandomForestRegressor(n_estimators=50, random_state=42)
    rf_yield.fit(X, y_yield)

    rf_cost = RandomForestRegressor(n_estimators=50, random_state=42)
    rf_cost.fit(X, y_cost)

    rf_price = RandomForestRegressor(n_estimators=50, random_state=42)
    rf_price.fit(X, y_price)

    # Save model artifact
    model_payload = {
        'rf_profit': rf_profit,
        'rf_yield': rf_yield,
        'rf_cost': rf_cost,
        'rf_price': rf_price,
        'le_season': le_season,
        'le_crop': le_crop,
        'le_location': le_location,
        'dataset_summary': df.to_dict(orient='records')
    }

    joblib.dump(model_payload, "ml/models/crop_profit_model.pkl")
    print("Model successfully trained and saved to ml/models/crop_profit_model.pkl")

if __name__ == "__main__":
    train_and_save()
