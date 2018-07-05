if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')
const { ApolloEngine } = require('apollo-engine')
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const StarWarsAPI = require('./StarWarsAPI')

// Initialize your Express app like before
const app = express();

const server = new ApolloServer({
	// These will be defined for both new or existing servers
	typeDefs,
	resolvers,
	dataSources: () => ({
		starWars: new StarWarsAPI(),
	}),
	tracing: true,
	cacheControl: {
		defaultMaxAge: 5,
	},
});

server.applyMiddleware({ app });

// Initialize engine with your API key. Alternatively,
// set the ENGINE_API_KEY environment variable when you
// run your program.
const engine = new ApolloEngine({
  apiKey: process.env.APOLLO_API_KEY
});

// Call engine.listen instead of app.listen(port)
engine.listen({
  host: "0.0.0.0",
  port: process.env.APOLLO_ENGINE_PORT,
  expressApp: app,
});