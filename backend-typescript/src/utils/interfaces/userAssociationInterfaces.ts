import { Types } from 'mongoose'
export interface IRequestAssociationReqBody {
    recipientUsername: string
}

export interface IActionOnAssociationRequest {
    associationRequestId: Types.ObjectId
    status: 'accept' | 'reject' | 'pending' // only allow these two strings for status
}

export interface IAssociationRequestUsersRes {
    associationRequestId: Types.ObjectId
    associationRequestUsername: string
    associationRequestUserFullName: {
        firstName: string
        lastName: string
    }
}
