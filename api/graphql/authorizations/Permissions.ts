import { inputRule, rule, shield, and, or, not } from "graphql-shield";


const canAddFarm = rule({ cache: "contextual" })(
    async (_, _2, ctx: any, _3) => {
      const userId = ctx.userId;
      return ctx.userType == 'farmer' && ctx.userStatus == 'active';
    }
  );


  export const permissions = shield({
    Query: {
      
    },
    Mutation: {
      addFarm: canAddFarm
    },
    
  });