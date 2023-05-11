import { Document, model, Schema } from 'mongoose';





export type typeUsedFor = 'verification'

export interface ITransactions extends Document {
    userRef: string,
    usedFor: typeUsedFor;
    authorized: boolean;
    processToken: string;
    verified: boolean
    disabled: boolean;
    transactionValidityExpires: Date;
}

const TransactionsSchema = new Schema<ITransactions>({
    userRef: {
        type: String,
        requried: true
    },
    processToken: {
        type: String,
        index: true,
        required: true,
        unique: true,
        trim: true
    },
    verified: {
        type: Boolean,
        default: false
    },

    usedFor: {
        type: String,
    },
    authorized: {
        type: Boolean,
        default: false
    },
    transactionValidityExpires: Date,
    disabled: {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        versionKey: false,
        timestamps: true,
        toJSON: { virtuals: true, versionKey: false },
    });

export default model<ITransactions>('transactions', TransactionsSchema);