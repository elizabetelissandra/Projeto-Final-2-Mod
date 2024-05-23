import * as yup from 'yup'

const createRoomSchema = yup.object({
    number: yup.number().required(),
    type: yup.string().required(),
    guest_capacity: yup.number().required(),
    daily_rate: yup.number().required(),
    photo: yup.string().required(),
    status: yup.string()
  });

const updateStatusSchema = yup.object({
    id: yup.string().required(),
    status: yup.string().required()
  });

  export{ createRoomSchema, updateStatusSchema }