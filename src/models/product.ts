import mongoose from 'mongoose';

// describes required props of new User
interface ProductAttrs {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    userId?: string;
}

// describes required props that User Model has
interface ProductModel extends mongoose.Model<ProductDoc>{
    build(attrs: ProductAttrs): ProductDoc;
}

// describes required props that User Document has
interface ProductDoc extends mongoose.Document {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    userId?: string;
    version: number;
    orderId?: string;
}

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    userId: {
        type: String,
        ref: 'User',
        required: false
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

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product };