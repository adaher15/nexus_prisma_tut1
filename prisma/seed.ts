import { PrismaClient } from '@prisma/client'
import { AuthService } from '../src/utils/Auth';
const prisma = new PrismaClient()
const userStatus = ["pending", "active", "locked", "blocked", "deleted"];
const actors = [
    {
        "email": "farmer1@domain1.com",
        "password": "password123",
        "firstName": "Jacky",
        "lastName": "Chan"
    }, {
        "email": "farmer2@domain1.com",
        "password": "password123",
        "firstName": "Holy",
        "lastName": "Molly"
    }]


async function main() {
    for(var status of userStatus){
        const st = await prisma.userStatus.upsert({
            // data: {name: status}
            where: {name: status},
            update: {},
            create: {
                name: status
            }
        })
    }
    for (var actor of actors) {
        const passwordHash = await AuthService.getPasswordHash(actor["password"]);
        const u = await prisma.user.create({
            data: {
                email: actor["email"],
                password: passwordHash,
                UserStatus: {connect: {name: "active"}},
                UserProfile: {create: {
                    firstname: actor.firstName,
                    lastname: actor.lastName,
                    cellphone: "613-100-2222",
                    telephone: "613-100-2222",
                    Address: {
                        create: {
                            number: 929,
                            street: "Bank Street",
                            city: "Ottawa",
                            province: "ON",
                            country: "Canada"
                        }
                    }
                }}
            }
          });
    }  
}
    


main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
