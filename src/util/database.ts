import {config} from "../config/dev";
import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

export const mongoConnect = async (callback: any) => {
    try {
        const client = await MongoClient.connect(config.mongoURI, { useUnifiedTopology: true })
        await console.log('Connected!');
        await callback(client);
    } catch (err) {
        console.log(err);
    }

};