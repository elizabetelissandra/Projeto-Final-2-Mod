import { Request, Response, Router } from "express";
import { auth } from "../middlewares/auth";
import { storageMiddleware } from "../middlewares/storage";
import { authenticate } from "../middlewares/authentication";

import { RoomModule } from "../app/Room/roomModule";

const {controller} = RoomModule.getInstances()
const roomRoutes = Router() 

roomRoutes.post('/',auth, storageMiddleware.single("photo") , controller.createRoomController.bind(controller))

roomRoutes.patch('/:id', auth, controller.updateStatusController.bind(controller))

roomRoutes.get('/', controller.findRoomByStatusController.bind(controller))

roomRoutes.get('/allrooms', controller.listAllRoomsController.bind(controller))

roomRoutes.get('/findbydate',authenticate, controller.listAvailableRoomsByDate.bind(controller))

export { roomRoutes }