import { User } from ".prisma/client";

// export interface SingUpInput  {
//     email: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     type: string;
// }

export const convertUser = (user: any) => {
    return {
        id: user.id,
        email: user.email,
        status: user.UserStatus.name,
        type: user.UserType.name,
    }
}