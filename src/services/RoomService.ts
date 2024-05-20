import { ParamsCreateRoomDTO, ParamsSearchAndCreateRoomDTO } from "../dtos/createRoomDTO";
import { roomRepository } from "../repositories/roomRepository";
import { adminRepository } from "../repositories/adminRepository";
import { ParamsUpdateStatusDTO } from "../dtos/updateStatus";
import { IRoom } from "../entities/Room";


export class RoomService {
  constructor(private repository: roomRepository) {}

  async createRoom(params: ParamsSearchAndCreateRoomDTO) {

    const roomExists = await this.repository.getByNumber(params.number);
    if (roomExists) {
        throw new Error("Sala já cadastrada");
    }
    


    const room = await this.repository.createRoom(params)
    return room
  }
  async updateStatus(params: ParamsUpdateStatusDTO){
    
    const status = await this.repository.editStatus(params.id, {status: params.status})
    return status
  }

  async findRoomByStatus(status: string){
    const rooms = await this.repository.findRoomByStatus(status)
    return rooms
  }

  async listAllRooms(){
    const rooms = await this.repository.listAllRooms()
    console.log("Console do service", rooms)
    return rooms
  }
}
