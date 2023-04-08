import mongoose, { Schema, Types } from 'mongoose'

interface IComment {
    commentBody: string
    post: Types.ObjectId
    commentCreator: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

// the comment will attach to post via id
const commentSchema = new mongoose.Schema<IComment>(
    {
        commentBody: {
            type: String,
        },
        post: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Post',
        },

        commentCreator: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true },
)

const commentModel = mongoose.model<IComment>('Comment', commentSchema)
export default commentModel
