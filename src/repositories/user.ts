import {User} from "../models/user";
import {getDb} from "../util/database";
import {Product} from "../models/product";
import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;

export const saveUser = async (user: User) => {
    try {
        const db = getDb();
        await db.colllection('users').insertOne(user);
    } catch (err) {
      console.log(err)
  }
};

export const addToCart = (user: User, product: Product) => {
    let items = Array.isArray(user.cart.items) ? user.cart.items : [];
    const cartProductIndex = items.findIndex((cart_product) => {
        return cart_product.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...items];
    if (cartProductIndex >= 0) {
        newQuantity = items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
      } else {
        console.log('product from Add to Cart', product);
        updatedCartItems.push({
          productId: new ObjectId(product._id),
          quantity: newQuantity
        });
      }
    const updatedCart = {
        items: updatedCartItems
    };
    const db = getDb();
    return db
        .collection('users')
        .updateOne(
          { _id: new ObjectId(user._id) },
          { $set: { cart: updatedCart } }
        );
};

export const getUserCart = (user: any) => {
    try {
        user.cart.items.map((i: any) => {
            return i.productId;
        });
        return Array.isArray(user.cart.items) ? user.cart.items : [];
    } catch (err) {
        console.log(err)
    }
};

export const deleteItemFromCart = (user: User, productId: number) => {
    const updatedCartItems = user.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(user._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
};

export const addOrder = async (user: User) => {
    try {
        const db = getDb();
        const products = await getUserCart(user);
        const order = await {
          items: products,
          user: {
            id: new ObjectId(user._id),
            name: user.username
          }
        };
        const result = await db.collection('orders').insertOne(order);
        // clean up user cart
        user.cart = { items: [], totalPrice: 0 };
        const clean_up = await db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(user._id) },
            { $set: { cart: { items: [] } } }
          );
        await console.log('result', result);
        await console.log('clean_up', clean_up);
    } catch (err) {
        console.log(err);
    }

};

export const getUserOrders = (user: User) => {
    const db = getDb();
    return db
      .collection('orders')
      .find({ 'user.id': new ObjectId(user._id) })
      .toArray();
};

export const findUserById = async (userId: string) => {
    try {
        const db = getDb();
        const user = await db
            .collection('users')
            .findOne({ _id: new ObjectId(userId) });
        await console.log(user);
        return user;
    } catch (err) {
        console.log(err);
    }
};