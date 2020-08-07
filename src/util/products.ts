import * as fs from "fs";

export const getProductsFromFile = (fn: any, file_path: string) => {
    fs.readFile(file_path, (err, fileContent: any) => {
       if (err) {
           fn([]);
       } else {
           fn(JSON.parse(fileContent));
       }
    });
};
