import express from 'express'
import { verifyFacultyToken, verifyToken } from '../middleware/authMiddleware'
import {
    createParentMessage,
    getMyParentMessages,
    getParentMessages,
    updateParentMessage,
} from '../controller/parentMessages/parentMessagesController'
const parentMessagesRouter = express.Router()

parentMessagesRouter.post(
    '/createParentMessage',
    verifyToken,
    createParentMessage,
)
parentMessagesRouter.get(
    '/getMyParentMessages',
    verifyToken,
    getMyParentMessages,
)
// ! FACULTY ROUTES
parentMessagesRouter.post(
    '/updateParentMessage',
    verifyFacultyToken,
    updateParentMessage,
)
parentMessagesRouter.get(
    '/getParentMessages',
    verifyFacultyToken,
    getParentMessages,
)

export default parentMessagesRouter
