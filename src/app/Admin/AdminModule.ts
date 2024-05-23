import { adminController } from "./controller/adminController";
import { adminRepository } from "./repository/adminRepository";
import { AdminService } from "./service/AdminService";


export class AdminModule{
    static getInstances(){
        const repository = new adminRepository
        const service = new AdminService(repository)
        const controller = new adminController(service)
        
        return {repository: repository, service, controller}
    }
}