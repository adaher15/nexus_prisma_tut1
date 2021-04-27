import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { AuthService } from "../../../src/utils/Auth";
import { DBError } from "../shared/Errors";
import { convertUser } from "./UserDTO";
import { SharedService } from "../../services/SharedService";
import { NexusGenInputs, NexusGenObjects } from "../../../nexus-typegen";
import { User } from ".prisma/client";

class UserService extends SharedService{

    /**
     * 
     * @param userInput 
     * @returns 
     */
    async signUpUser(userInput: NexusGenInputs['signUpInput']): Promise<User | null>  {
        try{
            const passwordHash = await AuthService.getPasswordHash(userInput.password);
            const user =  await this.prisma.user.create({ 
                data: 
                {
                    email: userInput.email,
                    password: passwordHash,
                    UserStatus: {connect: {name: "pending"}},
                    UserType: {connect: {name: userInput.type}},
                    UserProfile: {create: {
                        firstname: userInput.firstName, 
                        lastname: userInput.lastName
                    }}
                }
            });
            console.log("User Created", user)
            return user;
        }catch(e: any){
            console.error("ERROR______\n", e.meta)
            console.error(e instanceof PrismaClientKnownRequestError)
            console.error(e.code)
            throw  e;
        }
        return null;
    }

    /**
     * 
     * @param email 
     * @param password 
     * @returns 
     */
    async authenticateUser(email: string, password: string): Promise<{user: NexusGenObjects['User'] | null, error: DBError | null}> {
        let error= {} as DBError;
        const user = await this.prisma.user.findUnique( {
            where: {email},
            include: {
                UserStatus: {select: {name: true}},
                UserType: {select: {name: true}}
            }
        });
        if (!user) {
          error['code'] = 'A502';
          error['message'] = `No user found for email: ${email}`;
          return {user, error}
        }
        const passwordValid = await AuthService.compare(password, user.password);
        if (!passwordValid) {
            error['code'] = 'A503';
            error['message'] = `User password is invalid`;
            return {user: null, error}
        }
        console.log(user.UserStatus.name, user.UserType.name);
        return {user: convertUser(user), error}
    }
}

const userService = new UserService();
export { userService };