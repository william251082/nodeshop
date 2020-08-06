import express, {NextFunction, Request, Response} from 'express';
import * as path from "path";
import {rootDir} from "../util/path";
import {Product} from "../models/product";

const router = express.Router();

const products = Product;

router.get('/add-product',  (req: Request, res: Response) => {
    res.render('add-product', { pageTitle: 'Add Product' })
});

router.post('/add-product', (req:Request, res: Response, next: NextFunction) => {
    products.push(
            { title: req.body.title }
        );
    res.redirect('/');
});

export { router as adminRoutes, products }