import mongodb from "mongodb";
// @ts-ignore
import {ObjectIdConstructor} from "mongoose";

export class Product {
    constructor(
        public id: ObjectIdConstructor | null,
        public price: number,
        public title: string | null,
        public description: string | null,
        public imageUrl: string | null,
        public userId: ObjectIdConstructor | null

    ) {
        this.id = id ? new mongodb.ObjectId(id) : null;
        this.price = price;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userId = userId;
    }
}