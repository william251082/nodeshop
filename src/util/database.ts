import {config} from "../config/dev";
import mongodb from "mongodb";
import {app} from "../app";

let _db: any;

const MongoClient = mongodb.MongoClient;

export const mongoConnect = async (callback: any) => {
    try {
        const client = await MongoClient.connect(config.mongoURI, { useUnifiedTopology: true });
        await console.log('Connected to DB!');
        _db = await client.db();
        await callback(client);
    } catch (err) {
        console.log(err);
        throw err;
    }

};

export const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found'
};