import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
  const { userId, totalAmount } = req.body;
  const order = await Order.create({ userId, totalAmount });
  res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  const { userId } = req.body;
  const orders = await Order.findAll({ where: { userId } });
  res.json(orders);
};
