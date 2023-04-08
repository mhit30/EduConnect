require('dotenv').config()
import express from 'express'
import {
    requestAssociation,
    actionOnAssociationRequest,
    getAssociationRequests,
} from '../controller/userAssociation/userAssociationController'
import { verifyToken } from '../middleware/authMiddleware'
import { filterTeacherAccountTypeMiddleware } from '../middleware/accountTypeMiddleware'
const userAssociationRouter = express.Router()

userAssociationRouter.get(
    '/getAssociationRequests',
    verifyToken,
    filterTeacherAccountTypeMiddleware,
    getAssociationRequests,
)

userAssociationRouter.post(
    '/requestAssociation',
    verifyToken,
    filterTeacherAccountTypeMiddleware,
    requestAssociation,
)

userAssociationRouter.put(
    '/actionOnAssociationRequest',
    verifyToken,
    filterTeacherAccountTypeMiddleware,
    actionOnAssociationRequest,
)

export default userAssociationRouter
