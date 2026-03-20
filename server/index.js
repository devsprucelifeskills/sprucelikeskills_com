import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import courseRoutes from './routes/courseRoutes.js'
import authRoutes from './routes/authRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import partnerEnquiryRoutes from './routes/partnerEnquiryRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app = express()
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(express.json())

app.use('/api/v2/course', courseRoutes)
app.use('/api/v2/auth', authRoutes)
app.use('/api/v2/enquiry', enquiryRoutes)
app.use('/api/v2/partner-enquiry', partnerEnquiryRoutes)
app.use('/api/v2/upload', uploadRoutes)
app.use('/api/v2/admin', adminRoutes)

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