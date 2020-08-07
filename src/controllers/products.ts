import {NextFunction, Request, Response} from "express";
import {products} from "../routes/admin";
import * as adminData from "../routes/admin";

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
    products.push(
            { title: req.body.title }
        );
    res.redirect('/');
};

export const getProducts = (req:Request, res: Response) => {
    const products = adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        layout: false
    });
};