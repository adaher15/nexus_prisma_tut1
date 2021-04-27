import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import { createContext } from './context'
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './graphql/authorizations/Permissions';
var bodyParser = require('body-parser');

// export const server = new ApolloServer({ schema, context: createContext })
// server.listen({ port: 3000 }).then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`)
//   })


const app = express();

export const apollo = new ApolloServer(
  { 
    schema: applyMiddleware(schema, permissions), 
    // schema,
    playground: true,
    context: createContext 
  });
app.use(bodyParser.json())
apollo.applyMiddleware({app})
app.listen({ port: 3000 }, () => {
    console.log(`🚀 Server ready at : 3000 `)
  })
