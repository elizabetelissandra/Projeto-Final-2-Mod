import { Request, Response } from "express";
import * as yup from "yup";

import { StatusCode } from "../utils/statusCodes";
import { AdminService } from "../services/AdminService";
import { adminRepository } from "../repositories/adminRepository";

const Repository = new adminRepository();
const service = new AdminService(Repository);

export class adminController {
  constructor(service: AdminService) {}

  async loginController(req: Request, res: Response) {
    try {
      const { body } = req;
      const bodyValidator = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
      });
      await bodyValidator.validate(body);
      const result = await service.loginAdmin(body);
      return res.status(StatusCode.OK).send(result);
    } catch (error: any) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: error.message });
    }
  }

  async createAdminController(req: Request, res: Response) {
    try {
      const { body } = req;
      const bodyValidator = yup.object({
        email: yup.string().required(),
        password: yup.string().min(6).required()
      });

      await bodyValidator.validate(body);

      const result = await service.registerAdmin(body.email, body.password);

      return res.status(StatusCode.CREATED).send(result);
    } catch (error: any) {
      if (error.message === "Gerente já existe") {
        return res.status(StatusCode.CONFLICT).send({ message: error.message });
      }
      return res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: error.message });
    }
  }
}
