import * as path from "path";
import * as fs from "fs";

export const saveProduct = (product: any): void => {
    const file_path = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

    fs.readFile(file_path, (err, fileContent: any) => {
        let products = [];
        if (!err) {
            products = JSON.parse(fileContent);
        }
        products.push(product);
        fs.writeFile(file_path, JSON.stringify(products), (err)=> {
            console.log(err);
        })
    });
};

export const fetchAll = (fn: any): void => {
    const file_path = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
    fs.readFile(file_path, (err, fileContent: any) => {
       if (err) {
           fn([]);
       }
       fn(JSON.parse(fileContent));
    });
};