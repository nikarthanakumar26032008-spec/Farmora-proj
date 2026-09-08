const express = require('express');
const router = express.Router();
const { getFarmers, updateFarmerStatus } = require('../controllers/farmerController');

router.get('/', getFarmers);
router.put('/:id/approve', updateFarmerStatus);

module.exports = router;
