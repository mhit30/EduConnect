require('dotenv').config()
import express from 'express'
import {
    getMyUserInfo,
    updateUserInfo,
    getAssociatedUsers,
} from '../controller/user/userController'

import { verifyToken } from '../middleware/authMiddleware'
const userRouter = express.Router()
import { multerUpload } from '../utils/multerUpload'

userRouter.get('/getMyUserInfo', verifyToken, getMyUserInfo)
userRouter.post(
    '/updateUserInfo',
    verifyToken,
    multerUpload.single('avatar'), // uploaded form field name must be 'avatar
    updateUserInfo,
)
userRouter.get('/getAssociatedUsers', verifyToken, getAssociatedUsers)

export default userRouter
