import * as fs from "fs";
import {ICart, ICartProducts} from "../models/cart";
import {cart_file_path} from "../config/path";

export const addProduct = (id: string, productPrice: number | null, cart_file_path: string): void => {
    // Fetch previous cart
    fs.readFile(cart_file_path, (err, fileContent: any) => {
        let cart: ICart = { products: [], totalPrice: 0 };
        if (!err) {
            cart = JSON.parse(fileContent);
        }
        // Analyze the cart -- Find existing product
        const cart_prod = typeof(cart.products) === "undefined" ? [] : cart.products;
        const existingProductIndex: number = cart_prod.findIndex(prod => prod.id === id);
        const existingProduct: ICartProducts = cart_prod[existingProductIndex];

        // Add new product --increase quantity
        let updatedProduct: ICartProducts;
        if (existingProduct) {
            updatedProduct = { ...existingProduct };
            updatedProduct.quantity = updatedProduct.quantity + 1;
            cart_prod[existingProductIndex] = updatedProduct;
        } else {
            updatedProduct = { id, quantity: 1};
            cart.products = [...cart_prod, updatedProduct];
        }
        const total_price = cart.totalPrice === null ? 0 : cart.totalPrice;
        const p_price = typeof(productPrice) === "undefined" || productPrice === null ? 0 : productPrice;
        cart.totalPrice = total_price + +p_price;
        fs.writeFile(cart_file_path, JSON.stringify(cart), (err)=> {
            console.log(err);
        })
    });
};

export const getShoppingCart = (fn: any): void => {
    fs.readFile(cart_file_path, (err, fileContent:any) => {
        const cart = JSON.parse(fileContent);
        if (err) {
            fn(null)
        } else {
            fn(cart)
        }
    });
};