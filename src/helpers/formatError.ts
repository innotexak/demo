import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { isDev } from '../config/config.js';
import { ApolloExtraErrorCodes } from './ErrorHandler.js';

const ErrorFormat = (err: GraphQLError): GraphQLFormattedError => {
	if (err.extensions.code === ApolloExtraErrorCodes.AuthenticationError) {
		return err
	}
	
	if (err.extensions.code === ApolloExtraErrorCodes.ValidationError) {
		return err
	}
	
	if (err.extensions.code === ApolloExtraErrorCodes.FORBIDDEN) {
		return err
	}
	
	if (err.extensions.code === ApolloExtraErrorCodes.BAD_USER_INPUT) {
		return err
	}
	
	console.error(' Server Error: ', err);
	if (isDev) {
		return err;
	}
	return new Error('unknown error try again later');
};
export default ErrorFormat;
