export class Product {

    constructor(
        public price: number,
        public id?: string | null,
        protected title?: string | null,
        protected imageUrl?: string | null,
        protected description?: string | null,
        public quantity?: number | null,
    ) {
            this.id = id;
            this.title = title;
            this.imageUrl = imageUrl;
            this.description = description;
            this.price = price;
            this.quantity = quantity;
    }
}