import * as fs from "fs";
import {getProductsFromFile} from "../util/products";
import {Product} from "../models/product";

export const saveProduct = (product: Product, file_path: string): void => {
    product['id'] = Math.random().toString();
    getProductsFromFile((products: object[]) => {
        let curr_products = [...products, product];
        fs.writeFile(file_path, JSON.stringify(curr_products), (err)=> {
            console.log(err);
        })
    }, file_path);
};

export const fetchAll = (fn: any, file_path: string): void => {
    getProductsFromFile(fn, file_path);
};