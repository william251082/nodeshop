import mongodb from "mongodb";
import {config} from "./config/dev";

let _db: any;

const start = async () => {
    try {
      const client = await mongodb.MongoClient.connect(config.mongoURI, { useUnifiedTopology: true });
      console.log('Connected to Mongodb');
      _db = client.db();
    } catch (err) {
        console.error(err)
        throw (err);
    }
    console.log('app started');
};

export const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found'
};

start();