
import { extendType } from 'nexus'

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      async resolve(_root, args, ctx) {
        console.log("Inside Query")
        return [{ id: 1, email: 'test@domain.com', status: 1}]
        // return await ctx.prisma.user.findMany();
      },
    })
  },
});

