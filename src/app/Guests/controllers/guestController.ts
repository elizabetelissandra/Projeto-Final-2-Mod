import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCode } from '../../../utils/statusCodes'
import { GuestService } from '../services/GuestService'
import { createGuestSchema, loginGuestSchema } from '../schema/validateGuest'

export class GuestController {
  constructor(private service: GuestService) {}
  async loginController(req: Request, res: Response) {
    try {
      const { body } = req
      await loginGuestSchema.validate(body)
      const result = await this.service.loginGuest(body)
      return res.status(StatusCode.OK).send(result)
    } catch (error: any) {
      return res.status(StatusCode.BAD_REQUEST).send({ message: error.message })
    }
  }
  async createGuestController(req: Request, res: Response) {
    try {
      const { body } = req
      await createGuestSchema.validate(body)
      const result = await this.service.createGuest(body)
      return res.status(StatusCode.CREATED).send(result)
    } catch (error: any) {
      if (error.message === 'Hóspede já existe') {
        return res.status(StatusCode.CONFLICT).send({ message: error.message })
      }
      return res.status(StatusCode.BAD_REQUEST).send({ message: error.message })
    }
  }

  async listAll(req: Request, res: Response) {
    const result = await this.service.listAll()
    if (!result) {
      return res.status(StatusCode.BAD_REQUEST).send(result)
    }
    return res.status(StatusCode.OK).send(result)
  }

  async guestWithBookingsController(req: Request, res: Response) {
    try {
      const guestId = req.params.id
      const guest = await this.service.listAllUsers(guestId)
      if (!guest) {
        return res
          .status(StatusCode.NOT_FOUND)
          .send({ message: 'Hóspede não encontrado.' })
      }
      res.status(StatusCode.OK).send(guest)
    } catch (error: any) {
      return res.status(StatusCode.BAD_REQUEST).send({ message: error.message })
    }
  }
}
