import { SharedService } from "../../services/SharedService";
import { FarmInput } from "./FarmsDTO";
import { Address } from '../address/Address';


class FarmService extends SharedService{

    async addNewFarm(farmInput: FarmInput){
        const farm = this.prisma.farms.create({
            data: {
                name: farmInput.name,
                Address: { create: {
                    unit: farmInput.address.unit,
                    number: farmInput.address.number,
                    street: farmInput.address.street,
                    city: farmInput.address.city,
                    province: farmInput.address.province,
                    country: farmInput.address.country,
                    postalCode: farmInput.address.postalCode
                }
            }
            }
        });
        return farm;
    }
}

const farmService = new FarmService();
export { farmService };