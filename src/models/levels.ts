import { Schema, Document, model, ObjectId } from 'mongoose';

interface Id {
  id: ObjectId
}
interface ILevel {
  levelName: string;
  providers: Array<Id>
}

export interface IKYCLevel extends Document {
  userId: ObjectId
  levelName: string
  providers: Array<ObjectId>
  deleted: boolean
}

const kycLevelsSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },

  levelName: {
    type: String,
    required: true,
    unique: true
  },

  providers: [Schema.Types.ObjectId],

  deleted: {
    type: Boolean,
    unique: true,
    default: false
  },

},

  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: { virtuals: true, versionKey: false },
  }
);



export default model<IKYCLevel>('KYCLevel', kycLevelsSchema);


