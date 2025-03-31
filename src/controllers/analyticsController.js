const Order = require('../models/Order');
const User = require('../models/User');

exports.getAnalyticsData = async (req, res) => {
  try {
    // Monthly labels
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    // Sales revenue per month
    const salesRevenue = await Promise.all(labels.map(async (label, index) => {
      const start = new Date(2025, index, 1);
      const end = new Date(2025, index + 1, 0, 23, 59, 59);
      const orders = await Order.find({ createdAt: { $gte: start, $lte: end } });
      return orders.reduce((sum, o) => sum + o.price * o.quantity, 0);
    }));

    // User growth per month
    const userGrowth = await Promise.all(labels.map(async (label, index) => {
      const start = new Date(2025, index, 1);
      const end = new Date(2025, index + 1, 0, 23, 59, 59);
      return await User.countDocuments({ createdAt: { $gte: start, $lte: end } });
    }));

    res.json({ labels, salesRevenue, userGrowth });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Failed to load analytics data' });
  }
};