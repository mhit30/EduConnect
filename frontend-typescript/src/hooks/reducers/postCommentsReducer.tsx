import { Reducer } from 'react'
import { IPostComment, PostCommentsAction } from '../../types/PostCommentsTypes'

export const postCommentsReducer: Reducer<
    { postComments: IPostComment[] },
    PostCommentsAction
> = (state, action) => {
    switch (action.type) {
        case 'ADD_POST_COMMENTS':
            return { ...state, postComments: action.payload }
        default:
            return state
    }
}
