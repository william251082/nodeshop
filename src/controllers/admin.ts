import {NextFunction, Request, Response} from "express";
import {Product} from "../models/product";
import {deleteProductFromCollection, fetchAll, findById, saveProduct} from "../repositories/product";

export const getAddProduct = (req: Request, res: Response) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
};

export const postAddProduct = (req:Request, res: Response) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    Product
        .create({title: title, description: description, price: price, imageUrl: imageUrl})
        .then((result: any) => {
            console.log('Product Created');
        })
        .catch((err: any) => {
            console.log(err)
        });
    res.redirect('/');
};

export const getEditProduct = (req: Request, res: Response) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = Number(req.params.productId);
    findById(prodId)
        .then(([product]: any) => {
                res.render('admin/edit-product', {
                pageTitle: product.title,
                path: '/admin/edit-product',
                editing: editMode,
                product: product[0]
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
    const updatedProduct = {id: prodId, title: updatedTitle, description: updatedDescription, price: updatedPrice, imageUrl: updatedImageUrl};
    saveProduct(updatedProduct);
    res.redirect('/admin/products');
};

export const postDeleteProduct = (req:Request, res: Response, next: NextFunction) => {
    const prodId = Number(req.body.productId);
    deleteProductFromCollection(prodId);
    res.redirect('/admin/products');
};

export const getProducts = (req:Request, res: Response) => {
    fetchAll()
        .then(([rows, fieldData]: any) => {
                res.render('admin/products', {
                prods: rows,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch((err: any) => { console.log(err) });
};


