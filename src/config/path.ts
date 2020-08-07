import * as path from "path";

export const products_file_path = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
export const cart_file_path = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');