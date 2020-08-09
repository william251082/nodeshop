// @ts-ignore
import mysql from 'mysql2';
import {dev_db_config} from "../config/dev";

export const pool_promise =  mysql.createPool({
    host: dev_db_config.host,
    user: dev_db_config.user,
    database: dev_db_config.database,
    password: dev_db_config.password,
}).promise();