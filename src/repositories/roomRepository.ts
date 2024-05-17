import { ParamsCreateRoomDTO } from "../dtos/createRoomDTO";
import { InputLoginDTO } from "../dtos/loginDTO";
import { ParamsUpdateStatusDTO } from "../dtos/updateStatus";
import { IRoom, RoomModel } from "../entities/Room";
import { Room } from "../models/RoomModel";

export class RoomRepository {
  async getByNumber(number: number) {
    const roomNumber = await RoomModel.findOne({ number });
    return roomNumber;
  }

  async createRoom(params: ParamsCreateRoomDTO) {
    const newRoom = RoomModel.create(params);
    return newRoom;
  }

  async editStatus(id: string, data: any) {
    const status = await RoomModel.findByIdAndUpdate(id, data, { new: true });

    return status;
  }

  async findRoomByStatus(status: string): Promise<IRoom[]> {
    const statusRoom = await RoomModel.find({ status });
    return statusRoom;
  }

  async listAllRooms(){
    const allRooms = await RoomModel.find({});
    console.log("Console do repositorio", allRooms)
    return allRooms;
  }

  async editDate(id: string, data: any) {
    const status = await RoomModel.findByIdAndUpdate(id, data, { new: true });

    return status;
  }

}
