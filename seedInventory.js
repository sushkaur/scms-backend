require('dotenv').config();
const mongoose = require('mongoose');
const Inventory = require('./src/models/Inventory');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const items = [
  { name: "Laptop", category: "Electronics", supplier: "Tech Corp", quantity: 10, price: 1000 },
  { name: "Mouse", category: "Accessories", supplier: "Hardware Ltd", quantity: 50, price: 20 },
  { name: "Keyboard", category: "Accessories", supplier: "Hardware Ltd", quantity: 30, price: 50 },
  { name: "Monitor", category: "Electronics", supplier: "Tech World", quantity: 15, price: 200 },
  { name: "Printer", category: "Office Equipment", supplier: "Office Depot", quantity: 8, price: 150 },
  { name: "Desk Chair", category: "Furniture", supplier: "FurniCo", quantity: 25, price: 120 },
  { name: "External Hard Drive", category: "Storage", supplier: "DataTech", quantity: 40, price: 80 },
  { name: "Router", category: "Networking", supplier: "NetGear", quantity: 18, price: 90 },
  { name: "Graphics Card", category: "Electronics", supplier: "GPU Experts", quantity: 12, price: 500 },
  { name: "SSD 1TB", category: "Storage", supplier: "DataTech", quantity: 22, price: 150 }
];

Inventory.insertMany(items)
  .then(() => {
    console.log('Inventory seeded');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Seed failed:', err.message);
    mongoose.disconnect();
  });