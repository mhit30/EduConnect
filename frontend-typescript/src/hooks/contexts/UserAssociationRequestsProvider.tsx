import React, { useReducer, createContext, useEffect } from 'react'
import {
    IUserAssociationRequest,
    UserAssociationRequestsContextType,
} from '../../types/UserAssociationRequestTypes'
import { axiosClient } from '../../utils/axiosClient'
import { userAssociationRequestsReducer } from '../reducers/userAssociationRequestsReducer'

export const UserAssociationRequestsContext =
    createContext<UserAssociationRequestsContextType>({
        userAssociationRequests: null,
        getUserAssociationRequests: async () => Promise.resolve(),
        addUserAssociationRequest: async () => Promise.resolve(),
    })

export const UserAssociationRequestsProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [state, dispatch] = useReducer(userAssociationRequestsReducer, {
        userAssociationRequests: null,
    })

    useEffect(() => {
        getUserAssociationRequests()
    }, [])

    const getUserAssociationRequests = async () => {
        await axiosClient
            .get('/v1/userAssociation/getAssociationRequests')
            .then((res) => {
                addUserAssociationRequest(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const addUserAssociationRequest = async (
        userAssociationRequestPayload: IUserAssociationRequest[]
    ) => {
        // will individually add the association request, so we can check if there is already an association
        // request with a similar id

        dispatch({
            type: 'ADD_USER_ASSOCIATION_REQUESTS',
            payload: { ...userAssociationRequestPayload },
        })
    }

    return (
        <UserAssociationRequestsContext.Provider
            value={{
                getUserAssociationRequests,
                addUserAssociationRequest,
                userAssociationRequests: state.userAssociationRequests,
            }}
        >
            {children}
        </UserAssociationRequestsContext.Provider>
    )
}
