
require("dotenv").config()
import app from './app'

import { Database } from "./database";
import { databaseConfig } from "./config/databaseConfig";
Database.initialize()



app.listen(databaseConfig.port, () => console.log(`Servidor rodando na porta ${databaseConfig.port}`))
