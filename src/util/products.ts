import * as fs from "fs";

export const getProductsFromFile = (fn: any, products_file_path: string): void => {
    fs.readFile(products_file_path, (err, fileContent: any) => {
       if (err) {
           fn([]);
       } else {
           fn(JSON.parse(fileContent));
       }
    });
};
