import { config } from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from './schema.js';

import db from './config/database.js';
import { MONGO_URL, PORT } from './config/config.js';
import formatError from './helpers/formatError.js';
// import { ErrorHandler } from './helpers/ErrorHandler.js';

config()
interface MyContext {
	token?: String;
	
}

new db(console).connect(MONGO_URL as string);


const server = new ApolloServer<MyContext>({
	formatError,
	typeDefs,
	resolvers,
});


const { url } = await startStandaloneServer(server, {
	context: async ({ req, res }) => {
		// Add the user to the context
		return {  };
	},
	listen: { port: PORT ? Number(PORT) : 9000 }
});

console.log(`🚀 Server is ready at port ${url}`);



