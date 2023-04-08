import React, { useReducer, createContext, useEffect } from 'react'
import {
    ISchool,
    FacultySchoolContextType,
} from '../../../types/faculty/FacultySchoolContextType'
import { schoolReducer } from '../../reducers/faculty/schoolReducer'
import { axiosClient } from '../../../utils/axiosClient'
export const FacultySchoolContext = createContext<
    FacultySchoolContextType | undefined
>({
    school: null,
    addSchoolInfo: async () => Promise.resolve(),
    getSchoolInfo: async () => Promise.resolve(),
})

export const FacultySchoolProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(schoolReducer, { school: null })

    useEffect(() => {
        getSchoolInfo()
    }, [])
    const getSchoolInfo = async () => {
        await axiosClient
            .get('/v1/faculty/getSchoolInfo')
            .then((res) => {
                const { name, address, joinCode } = res.data
                addSchoolInfo({ name, address, joinCode })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const addSchoolInfo = async (schoolInfoPayload: ISchool) => {
        dispatch({
            type: 'ADD_SCHOOL_INFO',
            payload: { ...schoolInfoPayload },
        })
    }

    return (
        <FacultySchoolContext.Provider
            value={{ addSchoolInfo, getSchoolInfo, school: state.school }}
        >
            {children}
        </FacultySchoolContext.Provider>
    )
}
