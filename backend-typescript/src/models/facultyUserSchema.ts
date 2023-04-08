import mongoose, { Schema, Types } from 'mongoose'
import { validateEmail } from '../utils/validators/userSchemaValidators'
import bcrypt from 'bcrypt'

export interface IFacultyUser {
    accountHolderFullName: {
        firstName: string
        lastName: string
    }
    email: string
    password: string
    jwtToken: string
    createdAt: Date
    updatedAt: Date
}
const saltRounds = 10

const facultyUserSchema = new mongoose.Schema<IFacultyUser>(
    {
        accountHolderFullName: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            validate: {
                validator: validateEmail, // will automatically pass email to validEmail function
                message: 'The email inputted in not a valid email.',
            },
        },
        password: {
            type: String,
            minlength: [
                8,
                'Your password is too short! Make it at least 8 characters.',
            ],
            required: true,
        },
        jwtToken: {
            type: String,
        },
    },
    { timestamps: true },
)

facultyUserSchema.pre('save', async function (next: Function) {
    const facultyUser = this
    if (facultyUser.isModified('password')) {
        facultyUser.password = await bcrypt.hash(
            facultyUser.password,
            saltRounds,
        )
    }
    next()
})

const facultyUserModel = mongoose.model<IFacultyUser>(
    'FacultyUser',
    facultyUserSchema,
)
export default facultyUserModel
