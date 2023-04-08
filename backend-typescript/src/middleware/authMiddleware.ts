require('dotenv').config()
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { getErrorMessage } from '../utils/errorMessage'
import { User } from '../types/User'
const JWT_SECRET_KEY: Secret | any = process.env.JWT_SECRET_KEY

// Code Adapted fom https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
// Author: Idris Olubisi
export const verifyToken = async (
    req: Request,
    res: Response,
    next: Function,
) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            throw new Error('A token is required for authentication')
        }
        const jwtToken = authorizationHeader.split(' ')[1]

        const decodedUser = jwt.verify(jwtToken, JWT_SECRET_KEY) as JwtPayload

        const { accountType, username, user_id } = decodedUser
        req.user = {
            accountType: accountType,
            username: username,
            user_id: user_id,
        }
        return next()
    } catch (error) {
        res.status(401).send(getErrorMessage(error))
    }
}

export const verifyFacultyToken = async (
    req: Request,
    res: Response,
    next: Function,
) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            throw new Error('A token is required for authentication')
        }
        const jwtToken = authorizationHeader.split(' ')[1]

        const decodedFacultyUser = jwt.verify(
            jwtToken,
            JWT_SECRET_KEY,
        ) as JwtPayload

        const { email, user_id } = decodedFacultyUser
        req.facultyUser = {
            email: email,
            user_id: user_id,
        }
        return next()
    } catch (error) {
        res.status(401).send(getErrorMessage(error))
    }
}
