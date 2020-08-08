import * as fs from "fs";
import {getProductsFromFile} from "../util/products";
import {Product} from "../models/product";
import {ICart, ICartProducts} from "../models/cart";
import {cart_file_path} from "../config/path";

export const saveProduct = (product: Product, products_file_path: string): void => {
    const product_id = Math.random().toString();
    getProductsFromFile((products: Product[]) => {
        if (product.id) {
            const existingProductIndex: number = products.findIndex((prod: Product) => prod.id === product.id);
            const updateProducts: Product[] = [...products];
            updateProducts[existingProductIndex] = product;
            fs.writeFile(products_file_path, JSON.stringify(updateProducts), (err)=> {
                console.log(err);
            });
        } else {
            product.setId(product_id);
            let curr_products = [...products, product];
            fs.writeFile(products_file_path, JSON.stringify(curr_products), (err)=> {
                console.log(err);
            });
        }
    }, products_file_path);
};

export const fetchAll = (fn: any, products_file_path: string): void => {
    getProductsFromFile(fn, products_file_path);
};

export const findById = (id: string, fn: any, products_file_path: string, ): void => {
    getProductsFromFile((products: Product[]) => {
        const product = products.find(p => p.id === id);
        fn(product)
    }, products_file_path);
};

export const deleteProductFromCollection = (id: string, products_file_path: string) => {
    getProductsFromFile((products: Product[]) => {
        const product = products.find((prod: Product) => prod.id === id);
        const updatedProducts = products.filter(p => p.id !== id);
        fs.writeFile(products_file_path, JSON.stringify(updatedProducts), (err) => {
                if (!err && product) {
                    deleteProductFromCart(product.id, product.price, cart_file_path)
                }
            });
    }, products_file_path);
};


const deleteProductFromCart = (id: string | null, productPrice: number, cart_file_path: string) => {
    getProductsFromFile((cart: ICart) => {
        const updatedCart = { ...cart };
        cart.totalPrice = productPrice;
        const product = updatedCart.products.find((prod: ICartProducts) => prod.id === id);
        if (product) {
            const productQty = product.quantity;
            updatedCart.products = updatedCart.products.filter((prod: ICartProducts) => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(cart_file_path, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        } else {
            console.log('Product From Cart File Not Defined')
        }
    }, cart_file_path);
};