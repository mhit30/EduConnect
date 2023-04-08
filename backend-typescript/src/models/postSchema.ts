import mongoose, { Schema, Types } from 'mongoose'
import userModel from './userSchema'

interface IPost {
    title: string
    description: string
    imageName?: string
    engagement: {
        likes: Types.ObjectId[]
        comments: Types.ObjectId[]
        shares: number
    }
    creator: Types.ObjectId
    school: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const postSchema = new mongoose.Schema<IPost>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        imageName: {
            type: String,
            required: false,
        },
        engagement: {
            likes: [], // likes will be referencing user ids and getting the number of likes will be length of array
            comments: [], // will be associated with comment model refs
            shares: {
                type: Number,
                default: 0,
            },
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
    },
    { timestamps: true },
)

postSchema.pre('validate', async function (next: Function) {
    const post = this
    const user = await userModel.findOne({ _id: post.creator })
    // if there user creator id associated with user model, then error
    // associate post.school with the user's school
    !user ? new Error('Unexpected error.') : (post.school = user.school)
    next()
})

const postModel = mongoose.model<IPost>('Post', postSchema)

export default postModel
