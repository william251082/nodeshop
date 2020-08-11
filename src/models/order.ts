import mongoose from 'mongoose';

interface IProduct {
    product: object;
    quantity: number
}

interface IUser {
    name: object;
    userId: any
}

// describes required props of new User
interface OrderAttrs {
    products: IProduct[];
    user: IUser;
}

// describes required props that User Model has
interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attrs: OrderAttrs): OrderDoc;
}

// describes required props that User Document has
interface OrderDoc extends mongoose.Document {
    products: IProduct[];
    user: IUser;
}

const orderSchema = new mongoose.Schema({
    products: [
      {
        product: { type: Object, required: true },
        quantity: { type: Number, required: true }
      }
    ],
    user: {
      name: {
        type: String,
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };