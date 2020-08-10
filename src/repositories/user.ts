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
  const cartProductIndex = user.cart.items.findIndex((cart_product) => {
      return cart_product.productId.toString() === product.id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...user.cart.items];
  if (cartProductIndex >= 0) {
      newQuantity = user.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: Number(new ObjectId(product.id)),
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
        { _id: new ObjectId(user.id) },
        { $set: { cart: updatedCart } }
      );
};

export const getCart = async (user: User) => {
    try {
        const db = getDb();
        const productIds = user.cart.items.map(i => {
            return i.productId;
        });
        const products = await db
          .collection('products')
          .find({ _id: { $in: productIds } })
          .toArray();
        await products.map((product: Product) => {
            return {
                ...product,
                quantity: user.cart.items.find((i: any) => {
                    return i.productId.toString() === product.id.toString();
                }).quantity
              };
        });
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
        { _id: new ObjectId(user.id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
};

export const addOrder = async (user: User) => {
    try {
        const db = getDb();
        const products = await getCart(user);
        const order = await {
          items: products,
          user: {
            id: new ObjectId(user.id),
            name: user.username
          }
        };
        await db.collection('orders').insertOne(order);
        user.cart = { items: [], totalPrice: 0 };
        const result = await db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(user.id) },
            { $set: { cart: { items: [] } } }
          );
        await console.log(result);
    } catch (err) {
        console.log(err);
    }

};

export const getUserOrders = (user: User) => {
    const db = getDb();
    return db
      .collection('orders')
      .find({ 'user.id': new ObjectId(user.id) })
      .toArray();
};

export const findByUserId = async (userId: number) => {
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