import { extendType, mutationType, objectType } from "nexus";

export const UserQueries = extendType({
    type: 'Query',
    definition(t) {
        t.crud.regions( { filtering: true } )
        t.crud.users({ ordering: true})
        t.crud.roles({ pagination: true})
    }
});




// ----- Query example  ------
// query filterRegions {
//     regions(
//       where:{ OR: [
//         {name: {contains:"south"}},
//         {id: {gt: 1}}
//       ]
//     })
//     {
//       id
//       name
//       description
//     }
//   }
  
  
//   query orderUsers {
//     users(orderBy: {id:desc}){
//       id
//       email
//       status
//     }
//   }