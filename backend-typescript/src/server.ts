require('dotenv').config()
import express, { Application, Response, Request } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
// Routes
import userAuthRouter from './routes/userAuthRoutes'
import facultyRouter from './routes/faculty/facultyRoutes'
import userAssociationRouter from './routes/userAssociationRoutes'
import postRouter from './routes/postRoutes'
import userRouter from './routes/userRoutes'
import calendarRouter from './routes/calendarRoutes'
import parentMessagesRouter from './routes/parentMessagesRoutes'
// Initializations
const app: Application = express()
app.use(cors())
app.use(express.json())
//#region Mongo Connection
const MONGODB_PASSWORD: any = process.env.MONGODB_PASSWORD

mongoose.connect('')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error '))
db.once('open', () => {
    console.log('MongoDB Connection Successful')
})
//#endregion

app.use('/v1/auth', userAuthRouter)
app.use('/v1/user', userRouter)
app.use('/v1/userAssociation', userAssociationRouter)
app.use('/v1/posts', postRouter)
app.use('/v1/faculty', facultyRouter)
app.use('/v1/calendar', calendarRouter)
app.use('/v1/parentMessages', parentMessagesRouter)

const PORT: any = process.env.PORT
var server = app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})
server.setTimeout(5000000)
