export class Cart {

    constructor(
        public id: string,
        protected totalPrice: number,
    ) {
            this.totalPrice = totalPrice;
    }
}