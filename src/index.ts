import mongoose from "mongoose";
import {config} from "./config/dev";
import {app} from "./app";

const start = async () => {
    try {
      await mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
      app.listen(3000, () => {
                console.log('Listening on port 3000, nodeshop')
            });
    } catch (err) {
        console.error(err);
        throw (err);
    }
    console.log('app started');
};

start();