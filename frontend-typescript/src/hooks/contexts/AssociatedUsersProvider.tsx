import React, { useReducer, createContext, useEffect } from 'react'
import {
    IAssociatedUser,
    AssociatedUsersContextType,
} from '../../types/AssociatedUsersProviderTypes'
import { axiosClient } from '../../utils/axiosClient'
import { associatedUsersReducer } from '../reducers/associatedUsersReducer'

export const AssociatedUsersContext = createContext<AssociatedUsersContextType>(
    { associatedUsers: null, getAssociatedUsers: async () => Promise.resolve() }
)

export const AssociatedUsersProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [state, dispatch] = useReducer(associatedUsersReducer, {
        associatedUsers: [],
    })

    useEffect(() => {
        getAssociatedUsers()
    }, [])

    const getAssociatedUsers = async () => {
        await axiosClient
            .get('v1/user/getAssociatedUsers')
            .then((res) => {
                addAssociatedUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addAssociatedUsers = async (
        associatedUsersPayload: IAssociatedUser[]
    ) => {
        dispatch({
            type: 'ADD_ASSOCIATED_USERS',
            payload: { ...associatedUsersPayload },
        })
    }

    return (
        <AssociatedUsersContext.Provider
            value={{
                getAssociatedUsers,
                associatedUsers: state.associatedUsers,
            }}
        >
            {children}
        </AssociatedUsersContext.Provider>
    )
}
