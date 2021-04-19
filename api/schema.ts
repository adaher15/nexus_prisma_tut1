import { nexusPrisma } from 'nexus-plugin-prisma'
import { makeSchema } from 'nexus'
import { join } from 'path'
import * as typeDefs from './graphql';



export const schema = makeSchema({
  // types: [], // 1
  types: typeDefs,
  plugins: [nexusPrisma({experimentalCRUD: true})],//[nexusSchemaPrisma({experimentalCRUD: true})],
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'), 
    schema: join(__dirname, '..', 'schema.graphql'), 
  },
  // typegenAutoConfig: {
  //   contextType: "Context.Context",
  //   sources : [
  //     { 
  //       source: "@prisma/client",
  //       alias: "prisma"
  //    },
  //    {
  //      source: require.resolve('./context'),
  //      alias: "Context"
  //    }
  //   ]
  // },
  contextType: {                                    
    module: join(__dirname, "./context.ts"),        
    export: "Context",                  
  },

})