import { arg, extendType, nonNull } from "nexus";
import { farmService } from "./FarmService";


export const FarmsMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('addFarm', {
            type: "Farms",
            args: {
                inputFarm: nonNull(arg({type: "inputFarm"}))
                
            },
            async resolve(_root, args, ctx){
                console.log("Save New Farm: ", JSON.stringify(args.inputFarm))
                return farmService.addNewFarm(args.inputFarm);
            }
        });
    }
});