import {dev_db_config} from "../config/dev";
import Sequelize from "sequelize";

// @ts-ignore
export const sequelize =  new Sequelize(dev_db_config.database, dev_db_config.user, dev_db_config.password, {
        dialect: 'mysql',
        host: dev_db_config.host
    }
);