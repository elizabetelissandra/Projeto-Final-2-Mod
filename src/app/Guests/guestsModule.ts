import { GuestController } from "./controllers/guestController"
import { guestRepository } from "./repositories/guestRepository"
import { GuestService } from "./services/GuestService"

export class GuestsModule {
  static getInstances() {
    
    const repository = new guestRepository()
    const service = new GuestService(repository)
    const controller = new GuestController(service)

    return {repository: repository, service, controller}
  }
}
