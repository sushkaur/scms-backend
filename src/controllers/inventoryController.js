const Inventory = require('../models/Inventory');

exports.getAllInventory = async (req, res) => {
  const items = await Inventory.find();
  res.json(items);
};

exports.addInventoryItem = async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error adding item', error: err.message });
  }
};

exports.updateInventoryItem = async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating item', error: err.message });
  }
};

exports.deleteInventoryItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting item', error: err.message });
  }
};