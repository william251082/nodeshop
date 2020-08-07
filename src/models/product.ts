export class Product {
    constructor(
        protected title: string | null,
        protected imageUrl: string | null,
        protected description: string | null,
        protected price: number | null
    ) {
            this.title = title;
            this.imageUrl = imageUrl;
            this.description = description;
            this.price = price;
    }
}