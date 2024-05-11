import bcrypt from 'bcrypt'
import { IGuest, IGuestDTO } from "../entities/Guest";
import { GuestRepository } from "../repositories/GuestRepository";
import { ParamsCreateGuestDTO } from '../dtos/createGuestDto';


export class GuestService{
    private guestRepository: GuestRepository
    constructor(repository: GuestRepository){
        this.guestRepository = repository;
    }

async criarHospede(params: ParamsCreateGuestDTO): Promise<IGuest>{
    const guestAlreadyExists  = await this.guestRepository.getByEmail(params)
    if(guestAlreadyExists){
        //lancar erro
    }
    const payload = {
        ...params,
        password: await bcrypt.hash()
    }

    return this.guestRepository.cadastroHospede(guestData)
}

}