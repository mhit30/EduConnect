import mongoose, { Schema, Types } from 'mongoose'

interface IEvent {
    name: string
    description: string
    eventType: 'no_school' | 'sports' | 'invitation' | 'other' | any
    eventDate: Date
    RSVPs?: Types.ObjectId[]
    school: Types.ObjectId
    eventCreator: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const eventSchema = new mongoose.Schema<IEvent>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        eventType: {
            type: String,
        },
        eventDate: {
            type: Date,
            required: true,
        },
        RSVPs: [],
        school: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'School',
        },
        eventCreator: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Faculty',
        },
    },
    { timestamps: true },
)

const eventModel = mongoose.model<IEvent>('Event', eventSchema)
export default eventModel
