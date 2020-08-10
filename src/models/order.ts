import {sequelize} from "../util/database";
import Sequelize from "sequelize";

export const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});