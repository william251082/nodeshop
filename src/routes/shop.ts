import express from 'express';
import {getCart, getCheckout, getIndex, getProducts} from "../controllers/shop";

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/cart', getCart);
router.get('/checkout', getCheckout);

export { router as shopRoutes }