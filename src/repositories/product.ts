import {Product} from "../models/product";
import {getDb} from "../util/database";
import mongodb from "mongodb";


export const saveProduct = async (product: Product) => {
  try {
    const db = getDb();
    let dbOp: any;
    if (product._id) {
      // Update product
        dbOp = await db
            .collection
            .updateOne({ _id: product._id}, {$set: product})
    } else {
      dbOp = await db.collection('products').insertOne(product);
    }
    await console.log('dbOp', dbOp)
  } catch (err) {
      console.log(err)
  }
};

export const fetchAll = async () => {
  try {
    const db = getDb();
    return await db
      .collection('products')
      .find()
      .toArray();
  } catch (err) {
    console.log(err);
  }
};

export const findById = async (prodId: number) => {
  try {
    const db = getDb();
    const product = await db
      .collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next();
    await console.log(product);
      return product;
  } catch (err) {
    console.log(err);
  }
};

export const deleteById = async (prodId: number) => {
  try {
    const db = getDb();
    const result = await db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .next();
    await console.log(result, "deleted!")
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductFromCart = () => {

};