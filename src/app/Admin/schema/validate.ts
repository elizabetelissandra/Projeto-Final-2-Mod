import * as yup from 'yup'

const loginAdminSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

const creatAdminSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().min(6).required(),
})

export {loginAdminSchema, creatAdminSchema}
