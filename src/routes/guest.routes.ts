import { Router, Request, Response } from 'express';
import * as Yup from 'yup'
import { hash } from 'bcrypt'
import { Guest } from '../models/GuestModel';

const router = Router()

router.post('/guest', async (req: Request, res: Response) =>{
    const guestSchema = Yup.object({
        name: Yup.string().required(),
        cpf: Yup.string().required().min(11),
        phone_number: Yup.number(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required()
    })
    try {
        const guest = await guestSchema.validate(req.body)
        guest.password = await hash(guest.password, 8)
        const newGuest = await new Guest(guest).save()
        res.send(newGuest)
}catch(error){
    const {errors, message } = error as Yup.ValidationError
    res.status(400).send({ ValidationErrors: errors, message })
}
})