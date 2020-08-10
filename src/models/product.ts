import {sequelize} from "../util/database";
import Sequelize from "sequelize";

export const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});