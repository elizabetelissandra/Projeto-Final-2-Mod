import { Request, Response } from 'express'
import { StatusCode } from '../../../utils/statusCodes'
import { AdminService } from '../service/AdminService'
import { adminRepository } from '../repository/adminRepository'
import { creatAdminSchema, loginAdminSchema } from '../schema/validate'

const Repository = new adminRepository()
const service = new AdminService(Repository)

export class adminController {
  constructor(service: AdminService) {}

  async loginController(req: Request, res: Response) {
    try {
      const { body } = req
      await loginAdminSchema.validate(body)
      const result = await service.loginAdmin(body)
      return res.status(StatusCode.OK).send(result)
    } catch (error: any) {
      return res.status(StatusCode.BAD_REQUEST).send({ message: error.message })
    }
  }
}
