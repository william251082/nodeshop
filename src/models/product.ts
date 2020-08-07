const products: any = [];

export class Product {

    constructor(public title?: string, public products?: []) {
        this.title = title;
    }

    save(): void {
        products.push(this)
    }

    fetchAll() {
        return products;
    }
}