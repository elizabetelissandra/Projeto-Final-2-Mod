import { InputLoginDTO } from "../../Guests/dtos/loginGuestDTO"
import { AdminModel, IAdmin } from "../model/Admin"


export class adminRepository{
    async createAdmin(input: InputLoginDTO): Promise<IAdmin | null>{
        return await AdminModel.create(input)
        
    }

    async getByEmail(email: string): Promise<IAdmin | null>{
        return await AdminModel.findOne({email})
    }

    async getById(id: string): Promise<IAdmin | null>{
        const admin = await AdminModel.findById(id)
        return admin
    }
}