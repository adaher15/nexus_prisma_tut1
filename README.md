# nexus_prisma_tut1
Simple tutorial to use Prisma with Nexus

npm install -g prisma
npm install -g ts-node
npm i @prisma/client @nexus/schema nexus-plugin-prisma @prisma/cli

# Init client
prisma init
prisma introspect
prisma generate
prisma studio

# Seeding
prisma db seed --preview-feature