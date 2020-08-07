import express from 'express';
import {Product} from "../models/product";
import {getAddProduct, getProducts, postAddProduct} from "../controllers/admin";

const router = express.Router();

const products = Product;

router.get('/add-product', getAddProduct);
router.get('/products', getProducts);
router.post('/add-product', postAddProduct);

export { router as adminRoutes, products }