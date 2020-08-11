import {NextFunction, Request, Response} from "express";
import {Product} from "../models/product";

export const getAddProduct = (req: Request, res: Response) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
};

export const postAddProduct = async (req: Request, res: Response) => {
    const { title, price, description, imageUrl } = req.body;
    const product = Product.build({
            title,
            price,
            description,
            imageUrl
        });
    await product.save();
    try {
        await console.log('Product Created');
        res.redirect('/admin/products');
    } catch(err) {
        console.log(err)
    }
};

export const getEditProduct = async (req: Request, res: Response) => {
    try {
        const editMode = req.query.edit;
        if (!editMode) {
            return res.redirect('/');
        }
        const prodId = req.params.productId;
        const product = await Product.findById(prodId);
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
          });
    } catch (err) {
        console.log(err)
    }
};

export const postEditProduct = async (req:any, res: Response) => {
    try {
        const product = await Product.findById(req.body.productId);
        if (!product) {
            throw new Error('Product Not Found Error!');
        }
        product.set({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl
        });
        await product.save();
        await console.log('UPDATED PRODUCT!', product);
        await res.redirect('/admin/products');
    } catch (err) {
        console.log(err)
    }
};

export const getProducts = async (req: any, res: Response) => {
    try {
        const products = await Product.find();
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'

        })
    } catch (err) {
        console.log(err)
    }
};

export const postDeleteProduct = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const prodId = Number(req.body.productId);
        const result = await deleteById(prodId);
        await console.log('DESTROYED PRODUCT', result);
        await res.redirect('/admin/products');
    } catch (err) {
        console.log(err)
    }
};


