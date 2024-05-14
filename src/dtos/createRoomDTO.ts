export interface ParamsCreateRoomDTO{
    number: number,
    type?: string | undefined,
    gest_capacity: number,
    daily_rate: number,
    photo: string,
    status: string
}

export interface ParamsSearchAndCreateRoomDTO{
    number: number,
    type?: string | undefined,
    gest_capacity: number,
    daily_rate: number,
    photo: string,
    status: string,
    email: string
}