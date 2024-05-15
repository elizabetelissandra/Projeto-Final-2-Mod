import { IAdmin } from "../../entities/Admin"

type IToApi =  IAdmin & { _id: string }

class AuthMapper {
  static toApi(admin: IToApi) {
    return {
      id: admin._id,
      email: admin.email,
      role: 'admin',
    }
  }
}

export {AuthMapper, IToApi}