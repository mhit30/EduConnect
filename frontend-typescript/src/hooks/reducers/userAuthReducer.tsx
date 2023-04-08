import { Reducer } from 'react'
import { IUser, UserAuthAction } from '../../types/UserAuthTypes'

export const userAuthReducer: Reducer<
    { isAuthenticated: boolean; user: IUser | null },
    UserAuthAction
> = (state, action) => {
    switch (action.type) {
        case 'REGISTER':
            return { ...state, isAuthenticated: true, user: action.payload }
        case 'LOGIN':
            return { ...state, isAuthenticated: true, user: action.payload }
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null }
        case 'UPDATE_USER':
            return { ...state, user: action.payload }
        default:
            return state
    }
}
