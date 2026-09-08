const express = require('express');
const router = express.Router();
const { predictCropProfit } = require('../controllers/mlController');

router.post('/predict', predictCropProfit);

module.exports = router;
