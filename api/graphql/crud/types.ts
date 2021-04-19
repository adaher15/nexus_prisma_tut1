import { objectType } from "nexus"

export const Region = objectType({
    name: "Region",
    definition(t){
        t.model.id()
        t.model.name()
        t.model.description()
    }
})

export const Role = objectType({
    name:  "Role",
    definition(t){
        t.model.id()
        t.model.role()
        t.model.description()
    }
})