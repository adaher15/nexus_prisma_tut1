import { extendType } from 'nexus'
import { User } from './User'

export const UserMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('singUp', {
            type: "String",
            args: {
                 
            },
            async resolve(_root, args, ctx){
                console.log("MUTATION")
                return "Hello World"
            }
        }
        )
    },
})