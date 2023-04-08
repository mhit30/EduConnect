import { EventsAction, IEvent } from '../../types/EventsContextTypes'
import { Reducer } from 'react'

export const eventsReducer: Reducer<
    { events: IEvent[] | null },
    EventsAction
> = (state, action) => {
    switch (action.type) {
        case 'ADD_EVENTS_INFO':
            return { ...state, events: action.payload }
        default:
            return state
    }
}
