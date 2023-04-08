import { Types } from 'mongoose'
import { IUserRes } from './shared/userInterface'

export interface IUserRegistrationReqBody {
    accountType: 'parent' | 'student' | 'teacher' | 'faculty' | any
    grade?: 9 | 10 | 11 | 12 | null
    fullName: {
        firstName: string
        lastName: string
    }
    email: string
    password: string
    joinCode: string
}

export interface IUserAuthRes extends IUserRes {
    jwtToken: string
}

export interface IUserLoginReqBody {
    username: string
    password: string
}
