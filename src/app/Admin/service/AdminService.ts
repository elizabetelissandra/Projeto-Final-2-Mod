import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminRepository } from "../repository/adminRepository";
import { InputLoginDTO } from "../../Admin/dtos/loginAdminDTO";
import { AuthMapper, IToApi } from "../../../utils/mappers/AuthMapper";
import { authConfig } from "../../../config/auth";



export class AdminService {
  constructor(private repository: adminRepository) {}

  async loginAdmin(params: InputLoginDTO){
    const admin = await this.repository.getByEmail(params.email);
    if (!admin) {
      throw new Error("Email ou senha incorretos");
    }

    const passwordValid = await this.repository.getByPassword(params.password)
    console.log(passwordValid)
    if (!passwordValid) {
      throw new Error("Email ou senha incorretos");
    }

    const payload = {...AuthMapper.toApi(admin as any as IToApi)}
    const secretKey = authConfig.secret
    const options = {expiresIn: '1h'}

    const token = jwt.sign(payload, secretKey, options)

    return {token, IAdmin: AuthMapper.toApi(admin as any as IToApi)}
  }
}
