import {Request, Response} from "express";
import {fetchAll, findById} from "../repositories/product";
import {cart_file_path, products_file_path} from "../config/path";
import {Product} from "../models/product";
import {addProduct, getShoppingCart} from "../repositories/cart";
import {ICart, ICartProducts} from "../models/cart";

export const getProducts = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    }, products_file_path);
};

export const getProduct = (req:Request, res: Response) => {
    const prodId = req.params.productId;
    findById(prodId, (product: Product) => {
        res.render('shop/product-detail', {
            product,
            pageTitle: product.title,
            path: '/products'
        });
    }, products_file_path);
};


export const getIndex = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    }, products_file_path);
};

export const getCart = (req:Request, res: Response) => {
    getShoppingCart((cart: ICart) => {
        fetchAll((products: Product[]) => {
            const cartProducts = [];
            for (let product of products) {
                const cartProductData: ICartProducts | undefined = cart.products.find((prod => prod.id === product.id));
                if (cartProductData) {
                    cartProducts.push({id: cartProductData.id, quantity: cartProductData.quantity})
                }
            }
                res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts

            });
        }, products_file_path);
    });
};

export const postCart = (req:Request, res: Response) => {
    const prodId = req.body.productId;
    findById(prodId, (product: Product) => {
        addProduct(prodId, product.price, cart_file_path)
    }, products_file_path);
    res.redirect('/')
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