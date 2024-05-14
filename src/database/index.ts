import mongoose from "mongoose";
import { databaseConfig } from "../config/databaseConfig";
require("dotenv").config()

export class Database{
    static async initialize(){
        mongoose.connection.on("open", ()=> {
            console.log("Banco de dados está rodando")
        })
        await mongoose.connect(databaseConfig.uri)
    }
}

export { mongoose };
