import {app} from "./app";

const start = () => {
    console.log('app started');
};

app.listen(3001, () => {
    console.log('Listening on port 3001, nodeshop')
});

start();