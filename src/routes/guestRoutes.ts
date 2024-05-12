import { Router } from 'express';
import { createGuestController } from '../controllers/guestController';

const guestRoutes = Router()

guestRoutes.post("/", createGuestController)

export {guestRoutes}