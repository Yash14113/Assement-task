import express from 'express'
import { Connection } from './db/db.js'
import DefaultData from './default.js'
import cors from 'cors';
import router from './routes/Routes.js';

const app=express()
app.use(express.json())
app.use(cors())
app.use('/',router)
const PORT=5000

app.listen(PORT,()=>{
    console.log(`The app running on port ${PORT}`)
})

Connection();
DefaultData()