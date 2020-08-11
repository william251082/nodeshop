// @ts-ignore
import {ObjectIdConstructor} from "mongoose";

interface ICart {
    items: ICartProducts[],
    totalPrice: number
}
interface ICartProducts {
    productId: number | ObjectIdConstructor | null | undefined
    quantity: number
}

export class User {
    constructor(
        public username: string | null,
        public email: string | null,
        public cart: ICart,
        public _id: ObjectIdConstructor | null,
    ) {
        this.username = username;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = _id;
    }
}