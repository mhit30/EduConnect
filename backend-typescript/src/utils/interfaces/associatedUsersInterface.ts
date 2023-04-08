import { Types } from 'mongoose'

export interface IAssociatedUsersRes {
    associatedUserId: Types.ObjectId
    associatedUserUsername: string
    associatedUserGrade?: number
    associatedUserFullName: {
        firstName: string
        lastName: string
    }
    associatedUserAvatarUrl: string
}
