import { arg, extendType, nonNull, stringArg } from 'nexus'
import { userService } from './UserService'
import { sign } from "jsonwebtoken"
import { APP_SECRET } from '../shared/Verifications';


export const UserMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('singUp', {
            type: "String",
            args: {
                inputUserSignUp: nonNull(arg({type: "signUpInput"}))
                
            },
            async resolve(_root, args, ctx){
                const user =  await userService.signUpUser(args.inputUserSignUp);
                if(user && user.id){
                    return `User registered successfully. UserId=${user.id}`;
                }
                else{
                    return `Error while trying to register the user`;
                }
            }
        });

        t.field("login", {
            type: "AuthPayload",
            args: {
              email: nonNull(stringArg()),
              password: nonNull(stringArg()),
            },
            async resolve(_root, { email, password }, ctx) {
                let _error = {};
                const {user, error} = await userService.authenticateUser(email, password);
                
                if( user ){
                    return { 
                        token: sign({ userId: user.id, status: user.status, type: user.type}, APP_SECRET),
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