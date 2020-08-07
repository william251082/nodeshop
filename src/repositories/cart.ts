import * as fs from "fs";

interface ICart {
    products: ICartProducts[],
    totalPrice: number
}

interface ICartProducts {
    id: string,
    quantity: number
}

export const addProduct = (id: string, productPrice: number, cart_file_path: string): void => {
    // Fetch previous cart
    fs.readFile(cart_file_path, (err, fileContent: any) => {
        let cart: ICart = { products: [], totalPrice: 0 };
        if (!err) {
            cart = JSON.parse(fileContent);
        }
        // Analyze the cart -- Find existing product
        const cart_prod = typeof(cart.products) === "undefined" ? [] : cart.products;
        const existingProductIndex: number = cart_prod.findIndex(prod => prod.id === id);
        const existingProduct: ICartProducts = cart_prod[existingProductIndex];

        // Add new product --increase quantity
        let updatedProduct: ICartProducts;
        if (existingProduct) {
            updatedProduct = { ...existingProduct };
            updatedProduct.quantity = updatedProduct.quantity + 1;
            cart_prod[existingProductIndex] = updatedProduct;
        } else {
            updatedProduct = { id, quantity: 1};
            cart.products = [...cart_prod, updatedProduct];
        }
        const p_price = typeof(productPrice) === "undefined" ? 0 : productPrice;
        cart.totalPrice = cart.totalPrice + +p_price;
        fs.writeFile(cart_file_path, JSON.stringify(cart), (err)=> {
            console.log(err);
        })
    });
};