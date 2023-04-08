require('dotenv').config()
import express from 'express'
import {
    schoolRegistration,
    checkSchoolJoinCode,
    getSchoolInfo,
    facultyUserRegistration,
    facultyUserLogin,
    facultyUserLogout,
    getMyFacultyUserInfo,
} from '../../controller/faculty/facultyController'
import { filterUnAuthorizedAccountsOnFacultyRoutesMiddleware } from '../../middleware/accountTypeMiddleware'
import { verifyFacultyToken } from '../../middleware/authMiddleware'
const facultyRouter = express.Router()

facultyRouter.get('/getMyFacultyUserInfo', getMyFacultyUserInfo)

facultyRouter.post('/facultyUserRegistration', facultyUserRegistration)
facultyRouter.post('/facultyUserLogin', facultyUserLogin)

facultyRouter.get('/facultyUserLogout', facultyUserLogout)

// School Routes
facultyRouter.post('/checkSchoolJoinCode', checkSchoolJoinCode)
facultyRouter.get('/getSchoolInfo', verifyFacultyToken, getSchoolInfo)

facultyRouter.post(
    '/schoolRegistration',
    verifyFacultyToken,
    schoolRegistration,
)

export default facultyRouter
