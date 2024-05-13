import { RoomModel } from "../entities/Room"


export class RoomRepository{

    async getByNumber(number: number){
        const roomNumber = await RoomModel.findOne({ number })
        return roomNumber
    }

    
}