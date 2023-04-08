import mongoose, { Document, Schema, Types } from 'mongoose'
interface IAssociationRequest extends Document {
    requester: Types.ObjectId
    recipient: Types.ObjectId
    status: 'accept' | 'reject' | 'pending'
}

const associationRequestSchema = new mongoose.Schema<IAssociationRequest>(
    {
        requester: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        recipient: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        status: {
            type: String,
            enum: {
                values: ['accept', 'reject', 'pending'],
                message: 'Unexpected request action.',
            },
            required: true,
        },
    },
    { timestamps: true },
)

const associationRequestModel = mongoose.model<IAssociationRequest>(
    'AssociationRequest',
    associationRequestSchema,
)
export default associationRequestModel
