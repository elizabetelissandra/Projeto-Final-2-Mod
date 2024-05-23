import { ParamsCreateRoomDTO } from "../../dtos/createRoomDTO";
import { InputLoginDTO } from "../../dtos/loginDTO";
import { ParamsUpdateStatusDTO } from "../../dtos/updateStatus";
import { IRoom, RoomModel } from "../entities/Room";
import { Room } from "../../../models/RoomModel";

export class roomRepository {
  async findRoomById(roomId: string): Promise<IRoom | null> {
    const room = await RoomModel.findOne({ _id: roomId });
    return room;
  }

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

  async listAllRooms() {
    const allRooms = await RoomModel.find({});
    return allRooms;
  }

  async findAllAvaiableRooms():Promise<IRoom[]> {
    const allRooms = await RoomModel.find({ status: "disponivel" }).exec();
    return allRooms
  }
}
