import { ParamsCreateRoomDTO } from "../dtos/createRoomDTO"
import { InputLoginDTO } from "../dtos/loginDTO"
import { RoomModel } from "../entities/Room"


export class RoomRepository{

    async getByNumber(number: number){
        const roomNumber = await RoomModel.findOne({ number })
        return roomNumber
    }

    async createRoom(params: ParamsCreateRoomDTO){
        const newRoom = RoomModel.create(params)
        return newRoom
    }
}