import { Request, Response, Router } from 'express';
import { GuestController } from '../controllers/guestController';
import { GuestRepository } from '../repositories/GuestRepository';
import { GuestService } from '../services/GuestService';

const repository = new GuestRepository
const guestService = new GuestService(repository)
const guestController = new GuestController(guestService)
const guestRoutes = Router()

guestRoutes.post("/", async (req: Request, res: Response) =>{
    await guestController.createGuestController(req, res)
})


guestRoutes.post('/auth', async (req: Request, res: Response) =>{
    await guestController.loginController(req, res)
})

export {guestRoutes}