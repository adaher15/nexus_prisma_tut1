import { arg, extendType, nonNull, stringArg } from 'nexus'
import { userService } from './UserService'
import { sign } from "jsonwebtoken"

const APP_SECRET = 'SOMESUPERSECRETKEY'

export const UserMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('singUp', {
            type: "User",
            args: {
                inputUserSignUp: nonNull(arg({type: "signUpInput"}))
                
            },
            async resolve(_root, args, ctx){
                return await userService.signUpUser(args.inputUserSignUp)
            }
        });

        t.field("login", {
            type: "AuthPayload",
            args: {
              email: nonNull(stringArg()),
              password: nonNull(stringArg()),
            },
            async resolve(_parent, { email, password }, context) {
                let _error = {};
                const {user, error} = await userService.authenticateUser(email, password);
                
                if( user ){
                    return { 
                        token: sign({ userId: user.id, status: user.UserStatus.name }, APP_SECRET),
                        user, 
                        error };
                }
                else{
                    return { error };
                }   
            }            
        });
    },
})