
import { inputObjectType, objectType } from 'nexus';
import { type } from '../../../nexus-typegen';


export const Farm = objectType({
    name: "Farms",
    definition(t){
        t.model.id()
        t.nonNull.model.name()
        t.model.address()
        t.model.Address()
    }
})

export const inputFarm = inputObjectType({
    name: "inputFarm",
    definition(t) {
        t.nonNull.string('name'),
        t.field('address', { type: 'inputAddress'})
    }
})