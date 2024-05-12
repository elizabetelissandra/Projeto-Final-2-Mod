import { ParamsCreateGuestDTO } from "../dtos/createGuestDto";
import { guestModel } from "../entities/Guest";

 

export class GuestRepository {
    async getByEmail(email: string) {
        const guest = await guestModel.findOne({ email })
        return guest
}

async createGuest(params: ParamsCreateGuestDTO){
    const guest = await guestModel.create(params)
    return guest
}

// async loginHospede(guestData: IGuestLogin):
// Promise<IGuest>{}
}