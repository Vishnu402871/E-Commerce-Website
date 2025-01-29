import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cartItem = await Cart.create({ userId, productId, quantity });
  res.status(201).json(cartItem);
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  await Cart.update({ quantity }, { where: { id } });
  res.json({ message: 'Cart updated successfully' });
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;
  await Cart.destroy({ where: { id } });
  res.json({ message: 'Item removed from cart' });
};

export const getCart = async (req, res) => {
  const { userId } = req.body;
  const cart = await Cart.findAll({ where: { userId } });
  res.json(cart);
};
