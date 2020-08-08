export class Product {
    constructor(
        public id: string | null,
        public price: number | null,
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

    get product_id(): string | null {
        return this.id;
    }

    get product_price(): number | null {
        return this.price;
    }

    get product_title(): string | null {
        return this.title;
    }

    get product_description(): string | null {
        return this.description;
    }

    get product_image_url(): string | null {
        return this.imageUrl;
    }

    setId(id: string): void {
        this.id = id;
    }

    setPrice(price: number): void {
        this.price = price;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setImageUrl(imageUrl: string): void {
        this.imageUrl = imageUrl;
    }
}