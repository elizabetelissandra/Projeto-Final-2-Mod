import { ParamsCreateRoomDTO, ParamsSearchAndCreateRoomDTO } from "../dtos/createRoomDTO";
import { RoomRepository } from "../repositories/roomRepository";
import { AdminRepository } from "../repositories/adminRepository";

export class RoomService {
  constructor(private repository: RoomRepository,
    private adminRepository: AdminRepository) {}

  async createRoom(params: ParamsSearchAndCreateRoomDTO) {

    const admin = await this.adminRepository.getByEmail(params.email)
    if (!admin) {
      throw new Error("Admin not found")
    }
    const roomExists = await this.repository.getByNumber(params.number);
    if (roomExists) {
      try {
        throw new Error("Sala já cadastrada");
      } catch (error) {}
    }

    const room = await this.repository.createRoom(params)
    return room
  }
}
