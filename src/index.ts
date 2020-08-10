import {mongoConnect} from "./util/database";
import {app} from "./app";

const start = async () => {
    try {
      await mongoConnect(() => {
            app.listen(3000, () => {
                console.log('Listening on port 3000, nodeshop')
            });
        });
    } catch (err) {
        console.error(err);
        throw (err);
    }
    console.log('app started');
};

start();