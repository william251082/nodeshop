import express from 'express';
import {
    getCart,
    getCheckout,
    getIndex,
    getOrders,
    getProduct,
    getProducts,
    postCart,
    postDeleteProductOnCart
} from "../controllers/shop";

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/cart', getCart);
router.post('/cart', postCart);
router.post('/cart-delete-item', postDeleteProductOnCart);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);

export { router as shopRoutes }