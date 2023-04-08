import { Reducer } from 'react'
import {
    IAssociatedUser,
    AssociatedUsersAction,
} from '../../types/AssociatedUsersProviderTypes'

export const associatedUsersReducer: Reducer<
    { associatedUsers: IAssociatedUser[] | null },
    AssociatedUsersAction
> = (state, action) => {
    switch (action.type) {
        case 'ADD_ASSOCIATED_USERS':
            return { ...state, associatedUsers: action.payload }
        default:
            return state
    }
}
