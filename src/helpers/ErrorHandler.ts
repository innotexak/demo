import { GraphQLError, GraphQLErrorOptions } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

export enum ApolloExtraErrorCodes {
	AuthenticationError = 'UNAUTHENTICATED',
	ValidationError = 'VALIDATION_FAILED',
	FORBIDDEN = 'FORBIDDEN',
	BAD_USER_INPUT = 'BAD_USER_INPUT',
	NotFoundError = 'NOT_FOUND',
	
}


class GraphQLErrorWithCode extends GraphQLError {
	constructor(
	 message: string,
	 code: ApolloServerErrorCode | ApolloExtraErrorCodes,
	 options?: GraphQLErrorOptions,
	) {
		super(message, {
			...options,
			extensions: { ...options?.extensions, code },
		});
		this.name = this.constructor.name;
	}
}


export class ErrorHandler {
	UserInputError(graphqlError: string) {
		const error = new GraphQLError(graphqlError);
		return new GraphQLErrorWithCode(error.message, ApolloServerErrorCode.BAD_USER_INPUT, {
			nodes: error.nodes,
			originalError: error.originalError ?? error,
			extensions: error.extensions,
		});
	}
	
	AuthenticationError(message?: string, options?: GraphQLErrorOptions) {
		const error = new GraphQLError(message || 'Account Not Authenticated', options);
		return new GraphQLErrorWithCode(error.message, ApolloExtraErrorCodes.AuthenticationError, {
			nodes: error.nodes,
			originalError: error.originalError ?? error,
			extensions: error.extensions,
		});
	}
	
	
	ValidationError(message: string, options?: GraphQLErrorOptions) {
		const error = new GraphQLError(message);
		return new GraphQLErrorWithCode(error.message, ApolloExtraErrorCodes.ValidationError, {
			nodes: error.nodes,
			originalError: error.originalError ?? error,
			extensions: error.extensions,
		});
	}
	
	ForbiddenError(message?: string, options?: GraphQLErrorOptions) {
		const error = new GraphQLError(message || 'Action Not Allowed', options);
		return new GraphQLErrorWithCode(error.message, ApolloExtraErrorCodes.FORBIDDEN, {
			nodes: error.nodes,
			originalError: error.originalError ?? error,
			extensions: error.extensions,
		});
	}
	
	NotFoundError(message?: string, options?: GraphQLErrorOptions) {
    const error = new GraphQLError(
      message || 'Resource Not Found',
      options
    );
    return new GraphQLErrorWithCode(
      error.message,
      ApolloExtraErrorCodes.NotFoundError,
      {
        nodes: error.nodes,
        originalError: error.originalError ?? error,
        extensions: error.extensions,
      }
    );
	
}
}
