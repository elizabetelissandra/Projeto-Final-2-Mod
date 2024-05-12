import { ParamsCreateGuestDTO } from "../dtos/createGuestDto";
import { GuestModel } from "../entities/Guest";

 

export class GuestRepository {
    async getByEmail(email: string) {
        const guest = await GuestModel.findOne({ email })
        return guest
}

async createGuest(params: ParamsCreateGuestDTO){
    const guest = await GuestModel.create(params)
    return guest
}

async getById(id: string){
    const guest = await GuestModel.findById(id)
    return guest
}
}