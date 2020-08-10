import {Request, Response} from "express";
import {deleteProductFromCart, fetchAll, findById} from "../repositories/product";
import {cart_file_path, products_file_path} from "../config/path";
import {Product} from "../models/product";
import {addProduct, getShoppingCart} from "../repositories/cart";
import {ICart, ICartProducts} from "../models/cart";

export const getProducts = (req:Request, res: Response) => {
    Product.findAll()
        .then((products: []) => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch((err: any) => { console.log(err) });
};

export const getProduct = (req:Request, res: Response) => {
    const prodId = Number(req.params.productId);
    Product.findByPk(prodId)
        .then((product: any) => {
                res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch((err: any) => { console.log(err) });
};


export const getIndex = (req:Request, res: Response) => {
    Product.findAll()
        .then((products: []) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch((err: any) => { console.log(err) });
};

export const getCart = (req:any, res: Response) => {
    console.log(req.user)
    req.user
        .getCart()
        .then((cart: any) => {
            console.log(cart)
            return cart
                .getProducts()
                .then((products: any) => {
                    res.render('shop/cart', {
                        products: products,
                        pageTitle: 'Your Cart',
                        path: '/cart'
                    });
                })
                .catch((err: any) => { console.log(err) });

        })
        .catch((err: any) => { console.log(err) });
};

export const postCart = (req:Request, res: Response) => {
    const prodId = req.body.productId;
    findById(prodId, (product: Product) => {
        addProduct(prodId, product.price, cart_file_path)
    }, products_file_path);
    res.redirect('/')
};

export const postDeleteProductOnCart = (req:Request, res: Response) => {
    const prodId = req.body.productId;
    findById(prodId,(product: Product) => {
        deleteProductFromCart(prodId, product.price, cart_file_path);
    }, products_file_path);
    res.redirect('/cart')
};

export const getOrders = (req:Request, res: Response) => {
    fetchAll((products: Product[]) => {
            res.render('shop/orders', {
            prods: products,
            pageTitle: 'Your Orders',
            path: '/orders'
        });
    }, products_file_path);
};

export const getCheckout = (req:Request, res: Response) => {
    fetchAll((products: Product[]) => {
            res.render('shop/checkout', {
            prods: products,
            pageTitle: 'Checkout',
            path: '/checkout'
        });
    }, products_file_path);
};