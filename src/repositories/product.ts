import {Product} from "../models/product";
import {getDb} from "../index";

export const saveProduct = async (product: Product) => {
  try {
    const db = getDb();
    const result = await db.collection('products').insertOne(product);
    await console.log(result)
  } catch (err) {
      console.log(err)
  }

};

export const fetchAll = (): any => {

};

export const findById = (id: number) => {
};

export const deleteProductFromCollection = (id: number) => {
};

export const deleteProductFromCart = () => {

};