import express from "express";
import connectMongo from "./db.js";
import router from "./routes/auth.js";
import noteRouter from './routes/Notes.js'
import cors from 'cors'

connectMongo()

const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
app.use('/user' , router)
app.use('/note' , noteRouter)


app.listen(port , ()=>{
    console.log('Todo app is running at port' , port)
})