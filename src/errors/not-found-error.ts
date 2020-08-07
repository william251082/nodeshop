import {Request, Response} from "express";

export const notFoundError = (req:Request, res: Response) => {
    res.status(404).render('404', {pageTitle: 'Page not Found', path: '/404'});
};