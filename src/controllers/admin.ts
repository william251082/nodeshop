import {NextFunction, Request, Response} from "express";
import {Product} from "../models/product";
import {fetchAll, findById, saveProduct} from "../repositories/product";
import {products_file_path} from "../config/path";

export const getAddProduct = (req: Request, res: Response) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
};

export const postAddProduct = (req:Request, res: Response) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.title;
    const price = req.body.price;
    const product: Product = new Product(null, price, title, description, imageUrl);
    saveProduct(product, products_file_path);
    res.redirect('/');
};

export const getEditProduct = (req: Request, res: Response) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    findById(prodId, (product: Product) => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    }, products_file_path)

};

export const postEditProduct = (req:Request, res: Response, next: NextFunction) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedProduct: Product = new Product(prodId, updatedPrice, updatedTitle, updatedDescription, updatedImageUrl);
    saveProduct(updatedProduct, products_file_path);
    res.redirect('/admin/products');
};

export const getProducts = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    }, products_file_path);
};
