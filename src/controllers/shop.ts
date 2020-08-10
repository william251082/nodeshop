import {Request, Response} from "express";
import {fetchAll, findById} from "../repositories/product";
import {addOrder, deleteItemFromCart, findByUserId, getUserOrders} from "../repositories/user";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await fetchAll();
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    } catch (err) {
        console.log(err);
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const prodId = Number(req.params.productId);
        const product = await findById(prodId);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'TITLE',
            path: '/products'
        });
    } catch (err) {
        console.log(err);
    }
};

export const getIndex = async (req: Request, res: Response) => {
    try {
        const products = await fetchAll();
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    } catch (err) {
        console.log(err);
    }

};

export const getCart = async (req: any, res: Response) => {
    try {
        const products = await req.user.getCart();
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
        });
    } catch (err) {
        console.log(err);
    }
};

export const postCart = async (req: any, res: Response) => {
    try {
        const prodId = req.body.productId;
        const product = await findById(prodId);
        const result = await req.user.addToCart(product);
        await console.log(result);
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
    }
};

export const postCartDeleteProduct = async (req: any, res: Response) => {
    try {
        const user = await findByUserId(req.user.id);
        const prodId = req.body.productId;
        const result = await deleteItemFromCart(user, prodId);
        console.log(result);
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
    }
};

export const postOrder = async (req: any, res: Response) => {
    try {
        let fetchedCart;
        const user = await findByUserId(req.user.id);
        const prodId = req.body.productId;
        const result = await addOrder(user);
        res.redirect('/orders');
    } catch (err) {
        console.log(err);
    }
};

export const getOrders = async (req: any, res: Response) => {
    try {
        const user = await findByUserId(req.user.id);
        const orders = getUserOrders(user);
        res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
        });
    } catch (err) {
        console.log(err);
    }
};