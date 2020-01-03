import * as Joi from 'joi';
import UploadModel, { IUploadModel } from './model';
import UploadValidation from './validation';
import { IUploadService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IUploadModelService}
 */
const UploadService: IUploadService = {
    /**
     * @returns {Promise < IUploadModel[] >}
     * @memberof UploadService
     */
    async findAll(): Promise<IUploadModel[]> {
        try {
            return await UploadModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUploadModel >}
     * @memberof UploadService
     */
    async findOne(id: string): Promise<IUploadModel> {
        try {
            const validate: Joi.ValidationResult<{
                id: string
            }> = UploadValidation.getUpload({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await UploadModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IUploadModel} upload
     * @returns {Promise < IUploadModel >}
     * @memberof UploadService
     */
    async insert(body: IUploadModel): Promise<IUploadModel> {
        try {
            const validate: Joi.ValidationResult<IUploadModel> = UploadValidation.createUpload(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const upload: IUploadModel = await UploadModel.create(body);

            return upload;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IUploadModel >}
     * @memberof UploadService
     */
    async remove(id: string): Promise<IUploadModel> {
        try {
            const validate: Joi.ValidationResult<{
                id: string
            }> = UploadValidation.removeUpload({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const upload: IUploadModel = await UploadModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return upload;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default UploadService;
