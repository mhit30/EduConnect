export interface IAssociatedUser {
    associatedUserId: string
}

export interface IUserInfo {
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

export type UserInfoContextType = {
    isLoading: boolean
    userInfo: IUserInfo | null
    getUserInfo: () => void
}
