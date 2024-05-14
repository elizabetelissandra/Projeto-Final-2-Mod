import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { InputLoginDTO, OutputLoginDTO } from "../dtos/loginDTO";
import { AdminRepository } from "../repositories/adminRepository";
import { AdminModel } from "../entities/Admin";



export class AdminService {
  constructor(private repository: AdminRepository) {}

  async loginAdmin(params: InputLoginDTO): Promise<OutputLoginDTO> {
    const admin = await this.repository.getByEmail(params.email);
    if (!admin) {
      throw new Error("Email ou senha incorretos");
    }

    const passwordValid = await bcrypt.compare(
      params.password,
      admin.password as string
    );
    if (!passwordValid) {
      throw new Error("Email ou senha incorretos");
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin"
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "5m" }
    );
    return { token };
  }

  async registerAdmin(email: string, password: string){
    const existingAdmin = await this.repository.getByEmail(email)
    if(existingAdmin){
      throw new Error('Email já cadastrado como gerente')
    }
  
    const hashedPassword = await bcrypt.hash(password, 8)

    const admin = this.repository.createAdmin({email, password: hashedPassword})
  
    return admin

  }
}
