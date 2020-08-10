export class Product {
    constructor(
        public id: string | null,
        public price: number,
        public title: string | null,
        public description: string | null,
        public imageUrl: string | null

    ) {
        this.id = id;
        this.price = price;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}