import { Request, Response, Router } from 'express';
import { GuestController } from '../controllers/guestController';
import { guestRepository } from '../repositories/guestRepository';
import { GuestService } from '../services/GuestService';

const repository = new guestRepository
const guestService = new GuestService(repository)
const guestController = new GuestController(guestService)
const guestRoutes = Router()

guestRoutes.post("/", async (req: Request, res: Response) =>{
    await guestController.createGuestController(req, res)
})


guestRoutes.post('/auth', async (req: Request, res: Response) =>{
    await guestController.loginController(req, res)
})

guestRoutes.get('/', async (req: Request, res: Response) =>{
    await guestController.listAll(req, res)
})

guestRoutes.get('/:id', async (req: Request, res: Response) =>{
    await guestController.guestWithBookingsController(req, res)
})

export {guestRoutes}