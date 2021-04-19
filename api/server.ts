import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context } from './context'

export const server = new ApolloServer({ schema, context })
server.listen({ port: 3000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })