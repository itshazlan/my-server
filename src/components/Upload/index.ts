import UploadService from './service';
import { HttpError } from '../../config/error';
import { IUploadModel } from './model';
import { NextFunction, Request, Response } from 'express';

import * as fs from 'fs';
import * as path from 'path';
import * as Loki from 'lokijs';
import UtilsProvider from './utils';

const DB_NAME = 'my_server';
const COLLECTION_NAME = 'uploadmodel';
const UPLOAD_PATH = 'uploads';
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // const uploads: IUploadModel[] = await UploadService.findAll();
        const col = await UtilsProvider.loadCollection(COLLECTION_NAME, db);

        res.send(col.data);
        // res.status(200).json(uploads);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        const col = await UtilsProvider.loadCollection(COLLECTION_NAME, db);
        const result = col.get(req.params.id);

        if (!result) {
            res.sendStatus(404);
            return;
        };

        res.setHeader('Content-Type', result.mimetype);
        fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
        // const upload: IUploadModel = await UploadService.findOne(req.params.id);

        // res.status(200).json(upload);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const col = await UtilsProvider.loadCollection(COLLECTION_NAME, db);
        const data = col.insert(req.file);

        db.saveDatabase();
        // const upload: IUploadModel = await UploadService.insert(req.body);

        // res.status(201).json(upload);
        res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname, description: data.description });
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const upload: IUploadModel = await UploadService.remove(req.params.id);

        res.status(200).json(upload);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}