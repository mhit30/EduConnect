import { Schema, Types } from 'mongoose'

export interface IFacultyRegistrationReqBody {
    accountHolderFullName: {
        firstName: string
        lastName: string
    }
    email: string
    password: string
}

export interface IFacultyRegistrationResBody {
    accountHolderFullName: {
        firstName: string
        lastName: string
    }
    email: string
    jwtToken: string
    id: Types.ObjectId
}

export interface IFacultyLoginReqBody {
    email: string
    password: string
}
export interface IFacultyLoginResBody {
    accountHolderFullName: {
        firstName: string
        lastName: string
    }
    email: string
    id: Types.ObjectId
    jwtToken: string
}
export interface ISchoolRegistrationReqBody {
    name: string
    address: {
        street: string
        city: string
        zip: string
        state: string
        country: string
    }
}
export interface ICheckSchoolJoinCodeReqBody {
    schoolJoinCode: string
}
export interface ICheckSchoolJoinCodeResBody {
    name: string
    address: {
        street: string
        city: string
        zip: string
        state: string
        country: string
    }
}

export interface IGetFacultyInfoResBody {
    accountHolderFullName: {
        firstName: string
        lastName: string
    }
    email: string
    id: Types.ObjectId
}

export interface IGetSchoolInfoResBody {
    name: string
    address: {
        street: string
        city: string
        zip: string
        state: string
        country: string
    }
    joinCode: string
}
