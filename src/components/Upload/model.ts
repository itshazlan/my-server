import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

export interface IUploadModel extends Document {
    description: string;
    image: string;
}

const UploadSchema: Schema = new Schema({
    description: String,
    image: String,
}, {
    collection: 'uploadmodel',
    versionKey: false
});

export default connections.db.model<IUploadModel>('UploadModel', UploadSchema);
