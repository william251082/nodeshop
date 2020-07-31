import express, {Request, Response} from 'express';
import * as path from "path";
import {rootDir} from "../util/path";

const router = express.Router();

router.get('/', (req:Request, res: Response) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});


export { router as shopRoutes }