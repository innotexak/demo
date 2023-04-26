import { InferType, array, boolean, object, string } from "yup"
import { ErrorHandler } from "../helpers/ErrorHandler.js";
import { Types } from "mongoose";

const objectId = string()
    .test('is-object-id', 'Invalid ID', (value) => Types.ObjectId.isValid(value as string));

const createLevelSchema = object({
    userId: objectId.required(),
    levelName: string().required(),
    providers: array().of(objectId.required())
});

const createServiceSchema = object({
    service: string().required(),
    disabled: boolean(),
    fields: array().required()
});

const createKycSchema = object({
    kycId: string(),
    data: object(),
    kycType: string().oneOf(["bvn", "nin", "passport", "drivingLicence"])
})

const validationNumberSchema = object({
    validationNumber: string().min(11, 'Minimum of 11 digits requried').max(16, 'Maximum of 16 digits requried').required()
})

export type ILevelValidation = InferType<typeof createLevelSchema>;
export type IServiceValidation = InferType<typeof createServiceSchema>
export type IKycValidation = InferType<typeof createKycSchema>
export type IValidationNumber = InferType<typeof validationNumberSchema>

export class LevelsValidation {
    createLevel(levelData: ILevelValidation) {
        return new Promise((resolve, reject) => {
            createLevelSchema.validate(levelData, { abortEarly: true }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(new ErrorHandler().ValidationError(err));
            });
        });
    }
}
export class ServicesValidation {
    createService(serviceData: IServiceValidation) {
        return new Promise((resolve, reject) => {
            createServiceSchema.validate(serviceData, { abortEarly: true }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(new ErrorHandler().ValidationError(err))
            })
        })

    }
}

export class KycsValidation {
    createKyc(kycData: IKycValidation) {
        return new Promise((resolve, reject) => {
            createKycSchema.validate(kycData, { abortEarly: true }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(new ErrorHandler().ValidationError(err))
            })
        })
    }
}

export class ValNumberValidation {
    validateNumber(val: IValidationNumber) {
        return new Promise((resolve, reject) => {
            validationNumberSchema.validate(val, { abortEarly: true }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(new ErrorHandler().ValidationError(err))
            })
        })
    }
}