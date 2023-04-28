import { Schema, Document, model, ObjectId } from 'mongoose';

interface Id {
    id: ObjectId
}
export interface ILevel {
    levelName: string;
    providers: Array<Id>
}

export interface IKYCLevel extends Document {
    userId: ObjectId
    levelName: string
    providers: Array<ObjectId>
    createdAt: Date
    processToken: string
}

const kycLevelsSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
    },

    levelName: {
        type: String,
    },

    providers: [Schema.Types.ObjectId],

    createdAt: { type: Date, default: Date.now, expires: '2h' },
    processToken: {
        type: String,
        required: true
    }

}
);

export default model<IKYCLevel>('temp_level', kycLevelsSchema);


