import mongoose, { Schema, Types } from 'mongoose'
import { getRandomAlphaNumeric } from '../utils/randomValues'

interface ISchool {
    name: string
    address: {
        street: string
        city: string
        zip: string
        state: string
        country: string
    }
    joinCode: string
    facultyUser: Types.ObjectId
}

const schoolSchema = new mongoose.Schema<ISchool>(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            zip: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        },
        joinCode: {
            type: String,
            required: true,
        },
        facultyUser: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'FacultyUser',
        },
    },
    { timestamps: true },
)

// using pre validate so we can set joinCode value as it is required
schoolSchema.pre('validate', async function (next: Function) {
    const school = this
    school.joinCode = getRandomAlphaNumeric(7).toUpperCase()
    next()
})

const schoolModel = mongoose.model<ISchool>('School', schoolSchema)
export default schoolModel
