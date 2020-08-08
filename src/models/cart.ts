export interface ICart {
    products: ICartProducts[],
    totalPrice: number
}

export interface ICartProducts {
    id: string,
    quantity: number
}

export class Cart {
    constructor(
        private id: string,
        public products: ICartProducts[],
        public totalPrice: number,
    ) {
            this.id = id;
            this.products = products;
            this.totalPrice = totalPrice;
    }

    get cart_id(): string {
        return this.id;
    }

    get cart_products(): ICartProducts[] {
        return this.products;
    }

    get cart_price(): number {
        return this.totalPrice;
    }

    setId(id: string): void {
        this.id = id;
    }

    setProducts(products: ICartProducts[]): void {
        this.products = products;
    }

    setTotalPrice(totalPrice: number): void {
        this.totalPrice = totalPrice;
    }
}