require('dotenv').config()
import express from 'express'
import {
    userRegistration,
    userLogin,
    userLogout,
} from '../controller/userAuth/userAuthController'
const userAuthRouter = express.Router()

userAuthRouter.post('/register', userRegistration)
userAuthRouter.post('/login', userLogin)
userAuthRouter.get('/logout', userLogout)

export default userAuthRouter
