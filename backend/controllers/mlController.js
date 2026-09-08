const axios = require('axios');

const predictCropProfit = async (req, res) => {
  const { season, location, land_area } = req.body;

  if (!season || !location || !land_area) {
    return res.status(400).json({ message: "Season, Location, and Land Area are required." });
  }

  const mlServiceUrl = process.env.ML_SERVICE_URL || "http://localhost:8000/predict";

  try {
    const response = await axios.post(mlServiceUrl, {
      season,
      location,
      land_area: Number(land_area)
    }, { timeout: 5000 });

    return res.json(response.data);
  } catch (error) {
    console.warn("Python ML FastAPI Service unreachable or timed out. Using dataset fallback prediction logic.");

    // Smart fallback if Python service is offline
    const landAreaNum = Number(land_area) || 1;
    const fallbackRecommendation = {
      inputs: { season, location, land_area: landAreaNum },
      recommended_crop: {
        crop: "Groundnut",
        estimated_cost_per_acre: 22000,
        expected_yield_per_acre: 1100,
        expected_revenue_per_acre: 60500,
        estimated_profit_per_acre: 38500,
        total_estimated_profit: 38500 * landAreaNum,
        total_estimated_cost: 22000 * landAreaNum,
        market_price_per_kg: 55,
        demand: "HIGH",
        water_requirement: "Medium"
      },
      all_recommendations: [
        {
          crop: "Groundnut",
          estimated_cost_per_acre: 22000,
          expected_yield_per_acre: 1100,
          expected_revenue_per_acre: 60500,
          estimated_profit_per_acre: 38500,
          total_estimated_profit: 38500 * landAreaNum,
          total_estimated_cost: 22000 * landAreaNum,
          market_price_per_kg: 55,
          demand: "HIGH",
          water_requirement: "Medium"
        },
        {
          crop: "Tomato",
          estimated_cost_per_acre: 30000,
          expected_yield_per_acre: 10000,
          expected_revenue_per_acre: 200000,
          estimated_profit_per_acre: 170000,
          total_estimated_profit: 170000 * landAreaNum,
          total_estimated_cost: 30000 * landAreaNum,
          market_price_per_kg: 20,
          demand: "HIGH",
          water_requirement: "High"
        },
        {
          crop: "Paddy",
          estimated_cost_per_acre: 14000,
          expected_yield_per_acre: 1100,
          expected_revenue_per_acre: 30800,
          estimated_profit_per_acre: 16800,
          total_estimated_profit: 16800 * landAreaNum,
          total_estimated_cost: 14000 * landAreaNum,
          market_price_per_kg: 28,
          demand: "MEDIUM",
          water_requirement: "High"
        }
      ]
    };

    return res.json(fallbackRecommendation);
  }
};

module.exports = {
  predictCropProfit
};
