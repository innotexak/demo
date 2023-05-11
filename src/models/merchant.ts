import { Schema, Document, model, ObjectId } from 'mongoose';

export interface IKYCInfo {
    type: string;
    id: ObjectId;
}

export interface IMerchant extends Document {
    merchantId: string,
    firstName: string,
    lastName: string,
    ballance: string,
    status: string,
    publicKey: string,
    secretKey: string
    testPublicKey: string
    testSecretKey: string
    kycLevel: IKYCInfo[];
}

const merchantKycsSchema: Schema = new Schema({

    merchantId: {
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
    kycLevel: {
        type: [
            {
                type: {
                    type: String,
                    enum: ['nin', 'bvn', 'passport', 'driverLicense']
                },
                kycId: { type: Schema.Types.ObjectId, required: true }
            }
        ],
        default: []
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

