const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getProducts, createProduct, updateProduct, getSmartReach } = require('../controllers/productController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage });

router.get('/', getProducts);
router.post('/', upload.single('imageFile'), createProduct);
router.put('/:id', updateProduct);
router.get('/:productId/smart-reach', getSmartReach);

module.exports = router;
