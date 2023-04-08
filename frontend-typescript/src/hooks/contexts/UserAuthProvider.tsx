import React, { useReducer, createContext, useEffect } from 'react'
import { IUser, UserAuthContextType } from '../../types/UserAuthTypes'
import { getUserJWTToken } from '../../utils/asyncStorage'
import { axiosClient } from '../../utils/axiosClient'
import { userAuthReducer } from '../reducers/userAuthReducer'

export const UserAuthContext = createContext<UserAuthContextType | undefined>({
    isAuthenticated: false,
    user: null,
    userAuthRegister: async () => Promise.resolve(),
    userAuthLogin: async () => Promise.resolve(),
    userAuthLogout: () => {},
    updateUserData: async () => Promise.resolve(),
    getUserInfo: async () => Promise.resolve(),
})

export const UserAuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(userAuthReducer, {
        isAuthenticated: false,
        user: null,
    })

    useEffect(() => {
        if (state.isAuthenticated) {
            getUserInfo()
        }
    }, [])

    const getUserInfo = async () => {
        // if there is a jwtToken in local storage, then auto request server
        await axiosClient
            .get('/v1/user/getMyUserInfo')
            .then((res) => {
                const {
                    accountType,
                    grade,
                    fullName,
                    username,
                    email,
                    avatarUrl,
                    associatedUsers,
                    minSchoolInfo,
                } = res.data

                userAuthLogin({
                    accountType: accountType,
                    grade: grade,
                    fullName: {
                        firstName: fullName.firstName,
                        lastName: fullName.lastName,
                    },
                    username: username,
                    email: email,
                    avatarUrl: avatarUrl,
                    associatedUsers: associatedUsers,
                    minSchoolInfo: {
                        name: minSchoolInfo.name,
                        address: {
                            city: minSchoolInfo.address.city,
                            state: minSchoolInfo.address.state,
                        },
                    },
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    // the returned value from auth request will be the user payload
    const userAuthRegister = async (userPayload: IUser) => {
        dispatch({
            type: 'REGISTER',
            payload: { ...userPayload },
        })
    }
    // the returned value from auth request will be the user payload
    const userAuthLogin = async (userPayload: IUser) => {
        dispatch({
            type: 'LOGIN',
            payload: { ...userPayload },
        })
    }
    const userAuthLogout = () => {
        dispatch({
            type: 'LOGOUT',
        })
    }

    const updateUserData = async (userPayload: IUser) => {
        dispatch({
            type: 'UPDATE_USER',
            payload: { ...userPayload },
        })
    }

    return (
        <UserAuthContext.Provider
            value={{
                userAuthRegister,
                userAuthLogin,
                userAuthLogout,
                updateUserData,
                getUserInfo,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
            }}
        >
            {children}
        </UserAuthContext.Provider>
    )
}
