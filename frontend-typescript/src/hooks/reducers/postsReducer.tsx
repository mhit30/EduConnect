import { Reducer } from 'react'
import { IPost, PostAction } from '../../types/PostTypes'

export const postsReducer: Reducer<{ posts: IPost[] }, PostAction> = (
    state,
    action
) => {
    switch (action.type) {
        case 'ADD_POSTS':
            return { ...state, posts: action.payload }
        default:
            return state
    }
}
