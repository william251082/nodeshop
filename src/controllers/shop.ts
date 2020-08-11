import {Request, Response} from "express";
import {Product} from "../models/product";
import {Order} from "../models/order";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
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
        const product = await Product.findById(req.params.productId);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Edit Product',
            path: '/products'
        });
    } catch (err) {
        console.log(err);
    }
};

export const getIndex = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
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
        const user = await req.user.populate('cart.items.productId').execPopulate();
        const products = user.cart.items;
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: Array.isArray(products) ? products : []
        });
    } catch (err) {
        console.log(err);
    }
};

export const postCart = async (req: any, res: Response) => {
    try {
        const prodId = req.body.productId;
        const product = await Product.findById(prodId);
        const result = await req.user.addToCart(product);
        await console.log(result);
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
    }
};

export const postCartDeleteProduct = async (req: any, res: Response) => {
    try {
        const prodId = req.body.productId;
        const result = await req.user.removeFromCart(prodId);
        console.log(result);
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
    }
};

export const postOrder = async (req: any, res: Response) => {
    try {
        const user = await req.user.populate('cart.items.productId').execPopulate();
        const products = await user.cart.items.map((i: any) => {
            return { quantity: i.quantity, product: { ...i.productId._doc } };
        });
        const order = await Order.build({
          user: {
            name: req.user.name,
            userId: req.user
          },
          products: products
        });
        await order.save();
        await req.user.clearCart();
        res.redirect('/orders');
    } catch (err) {
        console.log(err);
    }
};

export const getOrders = async (req: any, res: Response) => {
    try {
        const orders = await Order.find({ 'user.userId': req.user._id })
        res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: Array.isArray(orders) ? orders : []
        });
    } catch (err) {
        console.log(err);
    }
};