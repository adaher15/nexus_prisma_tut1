# nexus_prisma_tut1
Simple tutorial to use Prisma with Nexus

npm install -g prisma
npm install -g ts-node
npm i @prisma/client @nexus/schema nexus-plugin-prisma @prisma/cli

# Init client
```
prisma init
prisma introspect
prisma generate
prisma studio
```
# Seeding
```
prisma db seed --preview-feature
```


# Add Nexus
```
npm add nexus graphql apollo-server
npm install --save  @nexus/schema
npm add --save-dev typescript ts-node-dev
```

# CRUD documentation 
https://nexusjs.org/docs/plugins/prisma/api

We could implement simple endpoint or use available CRUD from nexus-prisma