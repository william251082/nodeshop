import {Request, Response} from "express";
import {fetchAll, findById} from "../repositories/product";
import {file_path} from "../config/path";
import {Product} from "../models/product";

export const getProducts = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    }, file_path);
};

export const getProduct = (req:Request, res: Response) => {
    const prodId = req.params.productId;
    findById(prodId, (product: Product) => {
        res.render('shop/product-detail', {
            product,
            pageTitle: product['title'],
            path: '/products'
        });
    }, file_path);
};


export const getIndex = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    }, file_path);
};

export const getCart = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('shop/cart', {
            prods: products,
            pageTitle: 'Your Cart',
            path: '/cart'
        });
    }, file_path);
};

export const getOrders = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('shop/orders', {
            prods: products,
            pageTitle: 'Your Orders',
            path: '/orders'
        });
    }, file_path);
};

export const getCheckout = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('shop/checkout', {
            prods: products,
            pageTitle: 'Checkout',
            path: '/checkout'
        });
    }, file_path);
};