import { guestRepository } from "../Guests/repositories/guestRepository"
import { roomRepository } from "../Room/repositories/roomRepository"
import { bookingController } from "./controller/bookingController"
import { bookingRepository } from "./repositories/bookingRepository"
import { BookingService } from "./services/bookingService"



export class BookingModule{
    static getInstances(){
        const guestRepo = new guestRepository
        const repository = new bookingRepository
        const roomReposi = new roomRepository
        const service = new BookingService(repository, roomReposi, guestRepo)
        const controller = new bookingController(service)

        return {repository: repository, service, controller}
    }
}