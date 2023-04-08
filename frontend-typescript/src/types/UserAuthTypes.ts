import { IAssociatedUser } from './UserAssociationRequestTypes'

export interface IUser {
    accountType: 'parent' | 'student' | 'teacher' | 'faculty' | any
    grade: number
    fullName: {
        firstName: string
        lastName: string
    }
    username: string
    email: string
    avatarUrl: string
    associatedUsers: IAssociatedUser[]
    minSchoolInfo: {
        name: string
        address: {
            city: string
            state: string
        }
    }
}

export type UserAuthContextType = {
    isAuthenticated: boolean
    user: IUser | null
    userAuthRegister: (userPayload: IUser) => Promise<void>
    userAuthLogin: (userPayload: IUser) => Promise<void>
    userAuthLogout: () => void
    updateUserData: (userPayload: IUser) => Promise<void>
    getUserInfo: () => Promise<void>
}

export type UserAuthAction =
    | { type: 'REGISTER'; payload: IUser }
    | { type: 'LOGIN'; payload: IUser }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: IUser }
