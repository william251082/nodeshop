import {mongoConnect} from "./util/database";

let _db: any;

const start = async () => {
    try {
      await mongoConnect((client: any) => {
            console.log(client);
        });
    } catch (err) {
        console.error(err);
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