import express, {NextFunction, Request, Response} from 'express';
import * as path from "path";
import {rootDir} from "../util/path";
import {Product} from "../models/product";

const router = express.Router();

const products = Product;

router.get('/add-product',  (req: Request, res: Response) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req:Request, res: Response, next: NextFunction) => {
    products.push(
            { title: req.body.title }
        );
    res.redirect('/');
});

export { router as adminRoutes, products }