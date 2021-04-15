// import * as bcrypt from 'bcryptjs';
const bcrypt = require('bcrypt');

export class AuthService {
    static saltRounds: number = 12;

    static getSaltRoud(): number {
        return this.saltRounds;
    }

    static getPasswordHash(password: string): string {
		return bcrypt.hash(password, this.saltRounds);
    }
    
    static compare(password: string, dbHash: string): boolean {
        return bcrypt.compare(password, dbHash);
    }
}