import express, {Request, Response, NextFunction} from 'express';

const app = express();

app.use((req:Request, res: Response, next: NextFunction) => {
   console.log('in the middleware');
    next(); // Allows the request to continue to the next middleware in line
});

export { app }
