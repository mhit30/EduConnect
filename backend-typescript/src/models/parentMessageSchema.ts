import mongoose, { Schema, Types } from 'mongoose'

interface IParentMessage {
    title: string
    body: string
    status: 'pending' | 'resolved' | any
    student: Types.ObjectId
    creator: Types.ObjectId
    school: Types.ObjectId
}

const parentMessageSchema = new mongoose.Schema<IParentMessage>({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
    student: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    school: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'School',
    },
})

const parentMessageModel = mongoose.model<IParentMessage>(
    'ParentMessage',
    parentMessageSchema,
)

export default parentMessageModel
