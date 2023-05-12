import { InferType, array, boolean, date, object, string } from "yup"
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
    validationNumber: string().min(11, "Validation number can't be less than 11 digits").max(16, "Validation number can't be more than 16 digits").required("Validation number is requried"),
    firstName: string().required(),
    lastName: string().required(),
    phoneNumber: string().required(),
    dateOfBirth: date().required(),
    status: string().required(),
    gender: string().oneOf(['male', 'female']),
    kycType: string().oneOf(["bvn", "nin", "passport", "drivingLicence"]),
})

const ninNumber = object({
    validationNumber: string().matches(/^\d{11}$/, 'NIN must be a 11-digit number').length(11, "NIN must be exactly 11 digits").required("NIN is requried")
})

const bvnNumber = object({
    validationNumber: string().length(11, "BVN Must be exactly 11 digits").required("BVN is requried")
})

const drivingLicenceNumber = object({
    validationNumber: string()
        .matches(/^[A-Za-z0-9]{16}$/, 'Driving licence number must be a 16-character code that consists of letters and numbers')
        .required('Driving licence number is required')
});

const passportNumber = object({
    validationNumber: string()
        .matches(/^[A-Za-z]\d{8}$/, 'Passport number must start with an alphabet and be followed by 8 digits')
        .required('Passport number is required')
});

export type ILevelValidation = InferType<typeof createLevelSchema>;
export type IServiceValidation = InferType<typeof createServiceSchema>
export type IKycValidation = InferType<typeof createKycSchema>
export type INinValidation = InferType<typeof ninNumber>
export type IBvnValidation = InferType<typeof bvnNumber>
export type IPassportValidation = InferType<typeof passportNumber>
export type IDrivingLicenceValidation = InferType<typeof drivingLicenceNumber>

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



export class NinValidation {
    validateNin(nin: INinValidation) {
        return new Promise((resolve, reject) => {
            ninNumber.validate(nin, { abortEarly: true }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(new ErrorHandler().ValidationError(err))
            })
        })
    }
}

export class BvnValidation {
    validateBvn(bvn: IBvnValidation) {
        return new Promise((resolve, reject) => {
            bvnNumber.validate(bvn, { abortEarly: true }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(new ErrorHandler().ValidationError(err))
            })
        })
    }
}

export class DrivingLicenceValidation {
    validateDrivingLicence(drivingLincence: IDrivingLicenceValidation) {
        return new Promise((resolve, reject) => {
            drivingLicenceNumber.validate(drivingLincence, { abortEarly: true }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(new ErrorHandler().ValidationError(err))
            })
        })
    }
}

export class PassportValidation {
    validatePassport(passport: IPassportValidation) {
        return new Promise((resolve, reject) => {
            passportNumber.validate(passport, { abortEarly: true }).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(new ErrorHandler().ValidationError(err))
            })
        })
    }
}
