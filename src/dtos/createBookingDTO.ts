export interface ParamsCreateBookingDTO{
    checkin_date: Date, checkout_date: Date, 
    guests: number, 
    id_room: string, 
    id_guest: string
}