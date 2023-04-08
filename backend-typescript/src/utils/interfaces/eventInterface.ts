import { Schema, Types } from 'mongoose'

export interface ICreateEventReqBody {
    name: string
    description: string
    eventType: 'no_school' | 'sports' | 'invitation' | 'other' | any
    eventDate: Date | any // TODO CHANGE LATER TO JUST DATE
}

export interface IUpdateEventWithRSVP {
    updateType: 'RSVP'
    eventId: Types.ObjectId
}
interface IEvent {
    name: string
    description: string
    eventType: any
    eventDate: Date
    RSVPs?: Types.ObjectId[]
    volunteers?: Types.ObjectId[]
    school: Types.ObjectId
    eventCreator: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}
