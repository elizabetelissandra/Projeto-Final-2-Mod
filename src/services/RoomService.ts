import { ParamsCreateRoomDTO, ParamsSearchAndCreateRoomDTO } from "../dtos/createRoomDTO";
import { RoomRepository } from "../repositories/roomRepository";
import { adminRepository } from "../repositories/adminRepository";

export class RoomService {
  constructor(private repository: RoomRepository,
    private adminRepository: adminRepository) {}

  async createRoom(params: ParamsSearchAndCreateRoomDTO) {

    const roomExists = await this.repository.getByNumber(params.number);
    if (roomExists) {
        throw new Error("Sala já cadastrada");
    }

    const room = await this.repository.createRoom(params)
    return room
  }
}
