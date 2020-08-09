import {sequelize} from "../util/database";
import Sequelize from "sequelize";

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: Sequelize.STRING,
    description: {},
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.FALSE,
        allowNull: false,
    },
});