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

async cadastroHospede(guestData: IGuestDTO): Promise<IGuest>{
    return this.guestModel.create(guestData)
}

// async loginHospede(guestData: IGuestLogin):
// Promise<IGuest>{}
}