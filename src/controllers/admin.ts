import {NextFunction, Request, Response} from "express";
import {Product} from "../models/product";
import {fetchAll, saveProduct} from "../repositories/product";
import {file_path} from "../config/path";

export const getAddProduct = (req: Request, res: Response) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
};

export const postAddProduct = (req:Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.title;
    const price = req.body.price;

    const product = new Product(title, imageUrl, description, price);
    saveProduct(product, file_path);
    res.redirect('/');
};

export const getProducts = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    }, file_path);
};