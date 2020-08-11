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

export const getEditProduct = async (req: any, res: Response) => {
    try {
        const editMode = req.query.edit;
        if (!editMode) {
            return res.redirect('/');
        }
        const prodId = Number(req.params.productId);
        const product = await findById(prodId);
        if (product !== null) {
            return res.redirect('/')
        }
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

// export const postEditProduct = async (req:any, res: Response, next: NextFunction) => {
//     try {
//         const prodId = req.body.productId;
//         const updatedTitle = req.body.title;
//         const updatedPrice = req.body.price;
//         const updatedImageUrl = req.body.imageUrl;
//         const updatedDescription = req.body.description;
//         const product = new Product(
//                             new ObjectId(prodId),
//                             updatedTitle,
//                             updatedPrice,
//                             updatedDescription,
//                             updatedImageUrl,
//                             req.user.id
//                           );
//         const result = await saveProduct(product);
//         await console.log('UPDATED PRODUCT!', result);
//         await res.redirect('/admin/products');
//     } catch (err) {
//         console.log(err)
//     }
// };

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


