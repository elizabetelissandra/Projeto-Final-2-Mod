import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminRepository } from "../repository/adminRepository";
import { InputLoginDTO } from "../../Admin/dtos/loginAdminDTO";




export class AdminService {
  constructor(private repository: adminRepository) {}

  async loginAdmin(params: InputLoginDTO){
    const admin = await this.repository.getByEmail(params.email);
    if (!admin) {
      throw new Error("Email ou senha incorretos");
    }

    const passwordValid = await this.repository.getByPassword(params.password)

    if (!passwordValid) {
      throw new Error("Email ou senha incorretos");
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: 'admin'
      }, 
      process.env.SECRET_KEY as string, {expiresIn: '1h'})

    return { token }
  }
}
