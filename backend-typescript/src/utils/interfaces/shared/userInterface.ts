import { Types } from 'mongoose'

export interface IUserRes {
    accountType: 'parent' | 'student' | 'teacher' | 'faculty' | any
    grade: 9 | 10 | 11 | 12 | any
    fullName: {
        firstName: string
        lastName: string
    }
    username: string
    email: string
    avatarUrl: string
    associatedUsers: Types.ObjectId[]
    minSchoolInfo: {
        name: string
        address: {
            city: string
            state: string
        }
    }
}
