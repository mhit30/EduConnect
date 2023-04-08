import { Request, Response } from 'express'
import { getErrorMessage } from '../utils/errorMessage'

export const filterTeacherAccountTypeMiddleware = async (
    req: Request,
    res: Response,
    next: Function,
) => {
    try {
        if (req.user.accountType == 'teacher') {
            throw new Error('You are NOT authorized to access this path.')
        }
        return next()
    } catch (error) {
        res.status(401).send(getErrorMessage(error))
    }
}

export const filterUnauthorizedPostersAccountTypeMiddleware = async (
    req: Request,
    res: Response,
    next: Function,
) => {
    try {
        if (req.user.accountType == 'parent') {
            throw new Error('You are NOT authorized to access this path.')
        }
        return next()
    } catch (error) {
        res.status(401).send(getErrorMessage(error))
    }
}

export const filterUnAuthorizedAccountsOnFacultyRoutesMiddleware = async (
    req: Request,
    res: Response,
    next: Function,
) => {
    try {
        if (
            req.user.accountType == 'parent' ||
            req.user.accountType == 'student' ||
            req.user.accountType == 'teacher'
        )
            if (req.user) {
                throw new Error('You are NOT authorized to access this path.')
            }
        return next()
    } catch (error) {
        res.status(401).send(getErrorMessage(error))
    }
}
