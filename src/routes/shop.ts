import express, {Request, Response} from 'express';
import * as path from "path";
import {rootDir} from "../util/path";
import * as adminData from './admin';

const router = express.Router();

router.get('/', (req:Request, res: Response) => {
    res.render('shop');
});


export { router as shopRoutes }