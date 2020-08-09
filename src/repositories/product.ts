import {pool_promise} from "../util/database";
import {Product} from "../models/product";

export interface ProductObject {
  id: number | null;
  title: string | null;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
}

export const saveProduct = (product: Product | ProductObject) => {
  if (product.id === null) {
    return pool_promise.execute(
      'INSERT products(title, description, price, imageUrl) VALUES (?, ?, ?, ?)', [
           product.title, product.description, product.price, product.imageUrl
      ]
    );
  } else {
    return pool_promise.execute(
      'UPDATE products SET title = ?, description = ?, price = ?, imageUrl = ? WHERE products.id = ?', [
              product.title, product.description, product.price, product.imageUrl,  product.id,
      ]
    );
  }
};

export const fetchAll = (): any => {
  return pool_promise.execute('SELECT * FROM products');
};

export const findById = (id: number) => {
  return pool_promise.execute('SELECT * FROM products WHERE products.id = ?', [id]);
};

export const deleteProductFromCollection = (id: number) => {
  return pool_promise.execute('DELETE FROM products WHERE products.id = ?;', [id]);
};


export const deleteProductFromCart = () => {

};