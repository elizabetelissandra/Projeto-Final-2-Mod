import * as yup from 'yup'

const loginGuestSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  });

const createGuestSchema = yup.object({
    name: yup.string().required(),
    cpf: yup.number().required(),
    phone_number: yup.number().min(8),
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  });

  export {loginGuestSchema, createGuestSchema }