
require("dotenv").config()
import express from "express";
import app from './app'

import { Database } from "./database";
import { databaseConfig } from "./config/databaseConfig";
Database.initialize()

app.use(express.json())


app.listen(databaseConfig.port, () => console.log(`Servidor rodando na porta ${databaseConfig.port}`))
