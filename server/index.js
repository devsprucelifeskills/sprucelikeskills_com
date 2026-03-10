import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import bcrypt from 'bcrypt'


dotenv.config()
const app = express()
app.use(cors({
    origin: ["http://localhost:9002", "https://sprucelikeskills.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
}))




app.use(express.json())








const PORT = process.env.PORT
const MONGOURL = process.env.MONGOURL

// console.log(await bcrypt.hash("Spruceadmin200", 10))

mongoose
    .connect(MONGOURL, {
        family: 4 // Forces the use of IPv4
    })
    .then(() => console.log("connected to Database successfully"))
    .then(() => app.listen(PORT, () => {
        console.log("Server is running on port ", PORT)
        // async function getTestAttempts() {
        //     const data = await TestAttempt.find({ testId: '69ab22d563782236ec5bb42c' }).select('totalMarksObtained').populate('studentId', 'name email')
        //     console.log(data)
        // }
        // getTestAttempts()
    }))
    .catch((error) => console.log(error))