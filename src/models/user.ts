import * as mongoose from "mongoose";

interface ICart {
    items: ICartProducts[],
    totalPrice: number
}
interface ICartProducts {
    productId: string
    quantity: number
}

// describes required props of new User
interface UserAttrs {
    name: string;
    email: number;
    cart: string;
}

// describes required props that User Model has
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
    addToCart: any;
}

// describes required props that User Document has
interface UserDoc extends mongoose.Document {
    name: string;
    email: number;
    cart: string;
}

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
              required: true
            },
            quantity: { type: Number, required: true }
          }
        ]
    }
}, {
    // view level logic, not model
    toJSON: {
        // ret is the object that's just about to turn to JSON
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };