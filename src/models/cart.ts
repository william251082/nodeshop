import {sequelize} from "../util/database";
import Sequelize from "sequelize";

export interface ICart {
    products: ICartProducts[],
    totalPrice: number
}

export interface ICartProducts {
    id: string,
    quantity: number
}

export const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});