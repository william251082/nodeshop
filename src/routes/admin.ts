import express from 'express';
import {Product} from "../models/product";
import {getAddProduct, postAddProduct} from "../controllers/products";

const router = express.Router();

const products = Product;

router.get('/add-product', getAddProduct);

router.post('/add-product', postAddProduct);

export { router as adminRoutes, products }