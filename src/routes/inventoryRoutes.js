const express = require('express');
const router = express.Router();
const {
  getAllInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} = require('../controllers/inventoryController');

const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getAllInventory);
router.post('/', verifyToken, checkRole(['admin', 'supplier']), addInventoryItem);
router.put('/:id', verifyToken, checkRole(['admin', 'supplier']), updateInventoryItem);
router.delete('/:id', verifyToken, checkRole(['admin']), deleteInventoryItem);

module.exports = router;