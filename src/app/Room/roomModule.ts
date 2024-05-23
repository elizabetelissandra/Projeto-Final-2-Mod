import { BookingModule } from "../Booking/bookingModule"
import { RoomController } from "./controllers/roomController"
import { roomRepository } from "./repositories/roomRepository"
import { RoomService } from "./services/RoomService"

export class RoomModule {
  static getInstances() {
    const bookingModule = BookingModule.getInstances()
    const repository = new roomRepository()
    const service = new RoomService(repository, bookingModule.repository)
    const controller = new RoomController(service)

    return {repository: repository, service, controller}
  }
}
