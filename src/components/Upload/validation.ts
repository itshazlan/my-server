import * as Joi from 'joi';
import Validation from '../validation';
import { IUploadModel } from './model';

/**
 * @export
 * @class UploadValidation
 * @extends Validation
 */
class UploadValidation extends Validation {

    /**
     * Creates an instance of UploadValidation.
     * @memberof UploadValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IUploadModel} params
     * @returns {Joi.ValidationResult<IUploadModel >}
     * @memberof UploadValidation
     */
    createUpload(
        params: IUploadModel
    ): Joi.ValidationResult<IUploadModel> {
        const schema: Joi.Schema = Joi.object().keys({
            description: Joi.string().required(),
            image: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UploadValidation
     */
    getUpload(
        body: {
            id: string
        }
    ): Joi.ValidationResult<{
        id: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UploadValidation
     */
    removeUpload(
        body: {
            id: string
        }
    ): Joi.ValidationResult<{
        id: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new UploadValidation();
