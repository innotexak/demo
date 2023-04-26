import { Schema, Document, model, ObjectId, Model } from 'mongoose';


export interface IMerchant extends Document {
    userId: string,
    firstName: string,
    lastName: string,
    ballance: string,
    status: string,
    publicKey: string,
    secretKey: string
    testPublicKey: string
    testSecretKey: string
}

const merchantKycsSchema: Schema = new Schema({

    userId: {
        type: String,
        unique: true,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    ballance: {
        type: String,
        default: "20000"
    },

    status: {
        type: String,
        required: true,
        default: 'verified'
    },

    disabled: {
        type: Boolean,
        required: true,
        default: false
    },
    publicKey: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    secretKey: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    testPublicKey: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    testSecretKey: {
        type: String,
        required: true,
        index: true,
        unique: true
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

export default model<IMerchant>("merchant", merchantKycsSchema);

