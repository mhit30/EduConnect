import express from 'express'

import { verifyFacultyToken, verifyToken } from '../middleware/authMiddleware'
import {
    createEvent,
    getEventsFaculty,
    getEventsUsers,
    updateEventWithRSVP,
} from '../controller/calendar/calendarController'
const calendarRouter = express.Router()

calendarRouter.post('/createEvent', verifyFacultyToken, createEvent)
calendarRouter.get(
    '/getEventsFaculty',
    verifyFacultyToken, // verify faculty
    getEventsFaculty,
)

calendarRouter.get(
    '/getEventsUsers',
    verifyToken, // verify users
    getEventsUsers,
)

calendarRouter.put('/updateEventWithRSVP', verifyToken, updateEventWithRSVP)
export default calendarRouter
