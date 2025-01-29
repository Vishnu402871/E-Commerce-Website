import express from 'express';
import { addToCart, updateCart, removeFromCart, getCart } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addToCart);
router.put('/update/:id', protect, updateCart);
router.delete('/remove/:id', protect, removeFromCart);
router.get('/', protect, getCart);

export default router;
