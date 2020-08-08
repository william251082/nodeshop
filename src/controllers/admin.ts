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

export const postAddProduct = (req:Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.title;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const product = new Product(id, title, imageUrl, description, price, quantity);
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

export const getProducts = (req:Request, res: Response) => {
    fetchAll((products: []) => {
            res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    }, products_file_path);
};
