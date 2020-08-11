import express from 'express';
import {
    getCart,
    getIndex,
    getOrders,
    getProduct,
    getProducts,
    postCart, postCartDeleteProduct, postOrder
} from "../controllers/shop";

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
// router.get('/cart', getCart);
// router.post('/cart', postCart);
// router.post('/cart-delete-item', postCartDeleteProduct);
// router.post('/create-order', postOrder);
// router.get('/orders', getOrders);

export { router as shopRoutes }