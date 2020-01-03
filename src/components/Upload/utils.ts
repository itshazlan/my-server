import * as del from 'del';
import { Collection } from 'lokijs';
import { Request } from 'express';

const UtilsProvider = {

    async imageFilter(req: Request, file: any, cb: any): Promise<any> {
        try {
            // accept image only
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async loadCollection(colName: any, db: Loki): Promise<any> {
        try {
            return new Promise(resolve => {
                db.loadDatabase({}, () => {
                    const _collection = db.getCollection(colName) || db.addCollection(colName);
                    resolve(_collection);
                });
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async cleanFolder(folderPath: any): Promise<any> {
        // delete files inside folder but not the folder itself
        del.sync([`${folderPath}/**`, `!${folderPath}`]);
    }
};

export default UtilsProvider;