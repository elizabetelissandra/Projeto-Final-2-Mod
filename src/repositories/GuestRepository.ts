import { mongoose } from "../database";
import { IGuest, IGuestDTO, IGuestLogin } from "../entities/Guest";
import { Guest } from "../models/GuestModel";
import { Usuario } from "../models/UsuarioModel";
 

export class GuestRepository {
    guestModel: mongoose.Model<IGuest>; 
    usuarioModel: mongoose.Model<IGuestLogin>;
    constructor(guestModel: mongoose.Model<IGuest>, usuarioModel: mongoose.Model<IGuestLogin>) {
        this.guestModel = guestModel;
        this.usuarioModel = usuarioModel
}

async getByEmail(email: string) {
    const guest = await this.guestModel.findOne({ email })
    return guest
}

async cadastroHospede(guestData: IGuestDTO): Promise<IGuest>{
    return this.guestModel.create(guestData)
}

// async loginHospede(guestData: IGuestLogin):
// Promise<IGuest>{}
}