import { inputObjectType, objectType } from "nexus"


export const signUpInput = inputObjectType({
    name: "signUpInput",
    definition(t){
        t.nonNull.string("email")
        t.nonNull.string("password")
        t.nonNull.string("firstName")
        t.nonNull.string("lastName")
    }
});

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.email()
        t.model.status()
    }
})

