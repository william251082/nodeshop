import express from 'express';
import {Product} from "../models/product";
import {getAddProduct, getEditProduct, getProducts, postAddProduct, postEditProduct} from "../controllers/admin";

const router = express.Router();

const products = Product;

router.get('/add-product', getAddProduct);
router.get('/products', getProducts);
router.post('/add-product', postAddProduct);
router.get('/edit-product/:productId', getEditProduct);
router.post('/edit-product', postEditProduct);

export { router as adminRoutes, products }