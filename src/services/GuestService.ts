import bcrypt from 'bcrypt'
import { GuestRepository } from "../repositories/GuestRepository";
import { ParamsCreateGuestDTO } from '../dtos/createGuestDto';



export class GuestService{
    private guestRepository: GuestRepository
    constructor(repository: GuestRepository){
        this.guestRepository = repository;
    }

async createGuest(params: ParamsCreateGuestDTO){
    const guestAlreadyExists  = await this.guestRepository.getByEmail(params.email)
    if(guestAlreadyExists){
        try {
            throw new Error("Hospede já existe")
        } catch (error) {
            
        }
    }
    const payload = {
        ...params,
        password: await bcrypt.hash(params.password, 8)
    }

    await this.guestRepository.createGuest(payload)
}

}