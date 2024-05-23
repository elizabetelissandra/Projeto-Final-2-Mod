import * as yup from 'yup'

const createBookingSchema = yup.object({
    checkin_date: yup.date().required(),
    checkout_date: yup.date().required(),
    id_room: yup.string().required(),
    guests: yup.number().required(),
    id_guest: yup.string().required()
})

const cancelBookingSchema = yup.object({
    id: yup.string().required(),
    id_guest: yup.string().required()
})

export {createBookingSchema, cancelBookingSchema}