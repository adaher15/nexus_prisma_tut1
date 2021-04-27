import { PrismaClient } from '@prisma/client'
import { decodeToken, getUserId } from './graphql/shared/Verifications';


const prisma = new PrismaClient({ log: ['query'] })

export interface Context {
    prisma: PrismaClient,
    userId: string,
    userType: string,
    userStatus: string
  }

  
// export const context = {
//     prisma
//   };


export const createContext = (req: any): Context => {
  let userId = '';
  let userType = '';
  let userStatus = '';
  let currentResource = null;
    // console.log("createContext :", req.req.headers)
    if(req.req.headers.authorization){
      const token = req.req.headers.authorization.split(' ')[1];
      // console.log("Token :", token)
      if(token){ 
        const decodedToken = decodeToken(token);
        // console.log('DECODED TOKEN: ', decodedToken);
        userId = getUserId(decodedToken);
        userType = decodedToken.type;
        userStatus = decodedToken.status;
        // gqlCtx = buildTokenContext(token);
      }
    }
    
    return {
      prisma,
      userId,
      userType,
      userStatus
    }
  }


  