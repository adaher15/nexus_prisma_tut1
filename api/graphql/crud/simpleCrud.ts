import { extendType, mutationType, objectType } from "nexus";
// import { prismaObjectType } from "nexus-prisma"




export const UserQueries = extendType({
    type: 'Query',
    definition(t) {
        t.crud.user();
        t.crud.regions();
    }
});



export const UserMutations = mutationType({
    definition(t) {
      t.crud.createOneRegion()
      t.crud.updateOneRegion()
    },
  });
