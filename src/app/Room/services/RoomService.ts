import { ParamsCreateRoomDTO, ParamsSearchAndCreateRoomDTO } from "../../dtos/createRoomDTO";
import { roomRepository } from "../repositories/roomRepository";
import { ParamsUpdateStatusDTO } from "../../dtos/updateStatus";
import { IRoom } from "../entities/Room";
import { bookingRepository } from "../../Booking/repositories/bookingRepository";


export class RoomService {
  constructor(private repository: roomRepository, private bRepository: bookingRepository) {}

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
    return rooms
  }

  async getAvailableRoomsByDate(firstDate: Date, lastDate: Date): Promise<IRoom[]>{
    const allRooms = await this.repository.findAllAvaiableRooms()
    const unavailableRoomIds  = await this.bRepository.findRoomWithBookings(firstDate, lastDate)

    const availableRooms = allRooms.filter(room => !unavailableRoomIds.includes(room.id.toString()))

    return availableRooms
  }

}
