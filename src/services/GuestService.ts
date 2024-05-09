import { IGuest, IGuestDTO } from "../entities/Guest";
import { GuestRepository } from "../repositories/GuestRepository";


export class GuestService{
    private guestRepository: GuestRepository
    constructor(repository: GuestRepository){
        this.guestRepository = repository;
    }

async criarHospede(guestData: IGuestDTO): Promise<IGuest>{
    return this.guestRepository.cadastroHospede(guestData)
}

}