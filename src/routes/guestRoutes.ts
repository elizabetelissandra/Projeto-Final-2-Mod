import { Request, Response, Router } from 'express';
import { GuestsModule } from '../app/Guests/guestsModule';


const {controller} = GuestsModule.getInstances()
const guestRoutes = Router()

guestRoutes.post("/", controller.createGuestController.bind(controller))

guestRoutes.post('/auth', controller.loginController.bind(controller))

guestRoutes.get('/', controller.listAll.bind(controller))

guestRoutes.get('/:id', controller.guestWithBookingsController.bind(controller)
)

export {guestRoutes}