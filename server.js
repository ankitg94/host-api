import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import { ConnectDb } from "./Config/db.js"
import AuthRoute from "../lead/Route/AuthRoute.js"
import TaskRoute from "../lead/Route/TaskRoute.js"
import msgRoute from './Route/MsgRoute.js'
import cronJobs from "./Schedule/cronJobs.js";
import path from 'path'
import { fileURLToPath } from "url";
configDotenv()
ConnectDb()
//02-hosting k liye(start)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const app = express() 
app.use(express.json())
app.use(cors())

app.use("/api/v1/auth",AuthRoute) 
app.use("/api/v1/Task",TaskRoute) 
app.use("/api/v1/msg",msgRoute)

//03-hoisting(start)
app.use(express.static(path.join(__dirname, './client/build')))

const Port = process.env.PORT
app.listen(Port,()=>{
  console.log(`server is Running succesfully at the ${Port}`)
})

