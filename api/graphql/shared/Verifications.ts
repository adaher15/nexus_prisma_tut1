import { verify } from 'jsonwebtoken'

export const APP_SECRET = 'SOMESUPERSECRETKEY'

export const decodeToken= (token: string) => {
    const decoded = verify(token, APP_SECRET)
    return decoded;
  }

export const getUserId= (decodedToken: any) => {
    try{
      //  const decodedToken = decodeToken(token);
        const userId = decodedToken.userId
      if (!userId) {
        throw new Error('This User account is Not Authorized!')
      }    
      return userId
    }catch(e){
        throw new Error('This User account is Not Authorized!')
    }
}