import { Reducer } from 'react'
import {
    IUserAssociationRequest,
    UserAssociationRequestAction,
} from '../../types/UserAssociationRequestTypes'

export const userAssociationRequestsReducer: Reducer<
    {
        userAssociationRequests: IUserAssociationRequest[] | null
    },
    UserAssociationRequestAction
> = (state, action) => {
    switch (action.type) {
        case 'ADD_USER_ASSOCIATION_REQUESTS':
            return { ...state, userAssociationRequests: action.payload }
        case 'REMOVE_USER_ASSOCIATION_REQUEST':
            return { ...state, userAssociationRequests: action.payload }
        default:
            return state
    }
}
