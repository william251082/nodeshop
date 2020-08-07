import * as path from "path";

const products: any = [];

export class Product {

    constructor(public title?: string, public products?: []) {
        this.title = title;
    }
}