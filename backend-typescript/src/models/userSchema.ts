import mongoose, { Schema, Types } from 'mongoose'

import bcrypt from 'bcrypt'
import { validateEmail } from '../utils/validators/userSchemaValidators'

interface IUser {
    accountType: 'parent' | 'student' | 'teacher' | 'faculty'
    grade?: number
    fullName: {
        firstName: string
        lastName: string
    }
    username: string
    email: string
    password: string
    avatarName: string
    jwtToken: string
    associatedUsers: Types.ObjectId[] // change later
    school: Types.ObjectId
}

const saltRounds = 10
const userSchema = new mongoose.Schema<IUser>(
    {
        accountType: {
            type: String,
            enum: {
                values: ['parent', 'student', 'teacher'],
                message: 'Invalid Account Type',
            },
            required: true,
        },
        grade: {
            type: Number,
            enum: {
                values: [9, 10, 11, 12],
                message: 'Invalid Grade Level Input',
            },
            required: false,
        },
        fullName: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        username: { type: String, required: true, unique: true },
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
        avatarName: {
            default: '',
            type: String,
        },
        associatedUsers: [],
        school: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'School',
        },
    },
    { timestamps: true },
)

userSchema.pre('save', async function (next: Function) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds)
    }
    next()
})

userSchema.pre('validate', async function (next: Function) {
    const user = this
    user.username = user.email.slice(0, user.email.indexOf('@'))
    next()
})
const userModel = mongoose.model<IUser>('User', userSchema)

export default userModel
