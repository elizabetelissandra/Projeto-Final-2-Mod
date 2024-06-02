import { InputLoginDTO } from "../../Guests/dtos/loginGuestDTO"
import { AdminModel, IAdmin } from "../model/Admin"


export class adminRepository{
    async getByEmail(email: string){
        return await AdminModel.findOne({email})
    }

    async getByPassword(password: string){
        return await AdminModel.findOne({password})
    }

    async getById(id: string): Promise<IAdmin | null>{
        const admin = await AdminModel.findById(id)
        return admin
    }
}