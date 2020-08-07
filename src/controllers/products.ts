import {NextFunction, Request, Response} from "express";
import {Product} from "../models/product";
import {fetchAll, saveProduct} from "../repositories/product";

export const getAddProduct = (req: Request, res: Response) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
};

export const postAddProduct = (req:Request, res: Response, next: NextFunction) => {
    const product = new Product(req.body.title, []);
    saveProduct(product);
    res.redirect('/');
};

export const getProducts = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
            layout: false
        });
    });
};