import { mongoose } from "../database";
import { IGuest, IGuestDTO } from "../entities/Guest";
import { Guest } from "../models/GuestModel";

 

export class GuestRepository {
    guestModel: mongoose.Model<IGuest>; 
    constructor(guestModel: mongoose.Model<IGuest>) {
        this.guestModel = guestModel;
}

async cadastroHospede(guestData: IGuestDTO): Promise<IGuest>{
    return this.guestModel.create(guestData)
}

}