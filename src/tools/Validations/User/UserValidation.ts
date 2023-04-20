import { object, string,InferType } from 'yup';
import { ErrorHandler } from '../../../helpers/ErrorHandler.js';

const userSchema = object({
	firstName:string().required(),
	lastName:string().required(),
	email:string().email(),
	phone: string().required(),
	password: string().required(),
	gender: string().oneOf(['male','female'])
});

export type IUserValidation = InferType<typeof userSchema>;

export default class UserValidation {
	createUser (userData: IUserValidation) {
		return new Promise((resolve, reject) => {
			userSchema.validate(userData).then((data)=>{
				resolve(data)
			}).catch((err) => {
				reject(new ErrorHandler().ValidationError(err))
			});
			
		})
	}
}
