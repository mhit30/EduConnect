import {
    ParentMessagesActions,
    IParentMessage,
} from '../../types/ParentMessagesContextTypes'
import { Reducer } from 'react'

export const parentMessagesReducer: Reducer<
    { parentMessages: IParentMessage[] | null },
    ParentMessagesActions
> = (state, action) => {
    switch (action.type) {
        case 'ADD_PARENT_MESSAGES':
            return { ...state, parentMessages: action.payload }
        default:
            return state
    }
}
