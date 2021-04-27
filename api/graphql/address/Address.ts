
import { inputObjectType, objectType } from 'nexus';

export const Address = objectType({
    name: "Address",
    definition(t) {
        t.model.id(),
        t.model.unit(),
        t.nonNull.model.number(),
        t.nonNull.model.street(),
        t.nonNull.model.city(),
        t.nonNull.model.province(),
        t.nonNull.model.country(),
        t.nonNull.model.postalCode()
    }
});

export const inputAddress = inputObjectType({
    name: "inputAddress",
    definition(t) {
        t.int('unit'),
        t.nonNull.int('number'),
        t.nonNull.string('street'),
        t.nonNull.string('city'),
        t.nonNull.string('province'),
        t.nonNull.string('country'),
        t.nonNull.string('postalCode')
    }
});