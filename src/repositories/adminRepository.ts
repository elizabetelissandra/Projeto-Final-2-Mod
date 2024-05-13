import { IAdmin, AdminModel } from "../entities/Admin";

export class AdminRepository{
    async createAdmin(email: string, password: string): Promise<IAdmin>{
        return await AdminModel.create({email, password})
    }

    async getByEmail(email: string): Promise<IAdmin | null>{
        return await AdminModel.findOne({email})
    }
}