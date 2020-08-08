import * as fs from "fs";
import {getProductsFromFile} from "../util/products";
import {Product} from "../models/product";

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
