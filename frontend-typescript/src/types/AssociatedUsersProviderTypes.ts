export interface IAssociatedUser {
    associatedUserId: string
    associatedUserUsername: string
    associatedUserGrade: number
    associatedUserFullName: {
        firstName: string
        lastName: string
    }
    associatedUserAvatarUrl: string
}

export type AssociatedUsersContextType = {
    associatedUsers: IAssociatedUser[] | null
    getAssociatedUsers: () => Promise<void>
}

export type AssociatedUsersAction = {
    type: 'ADD_ASSOCIATED_USERS'
    payload: IAssociatedUser[]
}
