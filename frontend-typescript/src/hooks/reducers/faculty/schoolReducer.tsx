import { Reducer } from 'react'
import {
    ISchool,
    FacultySchoolAction,
} from '../../../types/faculty/FacultySchoolContextType'

export const schoolReducer: Reducer<
    { school: ISchool | null },
    FacultySchoolAction
> = (state, action) => {
    switch (action.type) {
        case 'ADD_SCHOOL_INFO':
            return { ...state, school: action.payload }
        default:
            return state
    }
}
