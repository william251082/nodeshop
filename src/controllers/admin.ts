import {NextFunction, Request, Response} from "express";
import {Product} from "../models/product";

export const getAddProduct = (req: Request, res: Response) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
};

export const postAddProduct = (req: any, res: Response) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    console.log(req);
    req.user
        .createProduct({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl
        })
        .then((result: any) => {
            console.log('Product Created');
        })
        .catch((err: any) => {
            console.log(err)
        });
    res.redirect('/admin/products');
};

export const getEditProduct = (req: Request, res: Response) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = Number(req.params.productId);
    Product.findByPk(prodId)
        .then((product: any) => {
                res.render('admin/edit-product', {
                pageTitle: product.title,
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch((err: any) => { console.log(err) });
};

export const postEditProduct = (req:Request, res: Response, next: NextFunction) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product.findByPk(prodId)
        .then((product: any) => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription;
            return product.save();
        })
        .then((result: any) => {
            console.log('Product Updated')
        })
        .catch((err: any) => { console.log(err) });
    res.redirect('/admin/products');
};

export const postDeleteProduct = (req:Request, res: Response, next: NextFunction) => {
    const prodId = Number(req.body.productId);
    Product.findByPk(prodId)
        .then((product: any) => {
            return product.destroy();
        })
        .then((result: any) => {
            console.log('Product Deleted')
        })
        .catch((err: any) => { console.log(err) });
    res.redirect('/admin/products');
};

export const getProducts = (req:Request, res: Response) => {
    Product.findAll()
        .then((products: []) => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch((err: any) => { console.log(err) });
};


