import React, { useReducer, createContext, useEffect } from 'react'
import { eventsReducer } from '../reducers/eventsReducer'
import { EventsContextType, IEvent } from '../../types/EventsContextTypes'
import { axiosClient } from '../../utils/axiosClient'

export const EventsContext = createContext<EventsContextType | undefined>({
    events: null,
    addEventsInfo: async () => Promise.resolve(),
    getEventsInfo: async () => Promise.resolve(),
})

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(eventsReducer, { events: null })
    useEffect(() => {
        getEventsInfo()
    }, [])
    const getEventsInfo = async () => {
        await axiosClient
            .get('/v1/calendar/getEventsUsers')
            .then((res) => {
                addEventsInfo(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const addEventsInfo = async (eventsInfoPayload: IEvent[]) => {
        dispatch({
            type: 'ADD_EVENTS_INFO',
            payload: { ...eventsInfoPayload },
        })
    }

    return (
        <EventsContext.Provider
            value={{ addEventsInfo, getEventsInfo, events: state.events }}
        >
            {children}
        </EventsContext.Provider>
    )
}
