import mongoose from "mongoose";
import {config} from "./config/dev";

const start = async () => {
    try {
      await mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
      console.log('Connected to Mongodb');
    } catch (err) {
        console.error(err)
    }
    console.log('app started');
};

start();