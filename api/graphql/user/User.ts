import { inputObjectType, objectType } from "nexus"


export const signUpInput = inputObjectType({
    name: "signUpInput",
    definition(t){
        t.nonNull.string("email")
        t.nonNull.string("password")
        t.nonNull.string("firstName")
        t.nonNull.string("lastName")
        t.nonNull.string("type")
    }
});

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.email()
        t.nonNull.string("status")
        t.nonNull.string("type")
    }
})

