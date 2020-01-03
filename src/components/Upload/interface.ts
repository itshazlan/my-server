import { IUploadModel } from './model';

/**
 * @export
 * @interface IUploadService
 */
export interface IUploadService {

    /**
     * @returns {Promise<IUploadModel[]>}
     * @memberof IUploadService
     */
    findAll(): Promise<IUploadModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IUploadModel>}
     * @memberof IUploadService
     */
    findOne(code: string): Promise<IUploadModel>;

    /**
     * @param {IUploadModel} IUploadModel
     * @returns {Promise<IUploadModel>}
     * @memberof IUploadService
     */
    insert(IUploadModel: IUploadModel): Promise<IUploadModel>;

    /**
     * @param {string} id
     * @returns {Promise<IUploadModel>}
     * @memberof IUploadService
     */
    remove(id: string): Promise<IUploadModel>;
}
