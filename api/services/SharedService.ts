import { PrismaClient } from "@prisma/client";


export class SharedService {
    protected prisma: PrismaClient;
    constructor() {
        this.prisma  = new PrismaClient();
    }

    
}