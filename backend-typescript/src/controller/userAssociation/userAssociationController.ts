require('dotenv').config()
import { Request, Response } from 'express'
import { Types } from 'mongoose'
import associationRequestModel from '../../models/associationRequestSchema'
import userModel from '../../models/userSchema'
import { getErrorMessage } from '../../utils/errorMessage'
import {
    IActionOnAssociationRequest,
    IAssociationRequestUsersRes,
    IRequestAssociationReqBody,
} from '../../utils/interfaces/userAssociationInterfaces'

export const getAssociationRequests = async (req: Request, res: Response) => {
    try {
        // get all association request where "i" the user am the recipient
        const associationRequests = await associationRequestModel.find({
            recipient: req.user.user_id,
        })
        const associationRequestUsersRes: Array<IAssociationRequestUsersRes> =
            []
        for (let i = 0; i < associationRequests.length; i++) {
            // get the user that have requested an association where you, the user were the recipient
            const associationRequestUser = await userModel.findOne({
                _id: associationRequests[i].requester,
            })
            if (!associationRequestUser) {
                throw new Error('An error has occurred')
            }
            associationRequestUsersRes.push({
                associationRequestId: associationRequests[i]._id,
                associationRequestUsername: associationRequestUser.username,
                associationRequestUserFullName: {
                    firstName: associationRequestUser.fullName.firstName,
                    lastName: associationRequestUser.fullName.lastName,
                },
            })
        }

        res.status(200).send(associationRequestUsersRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
export const requestAssociation = async (req: Request, res: Response) => {
    try {
        const { recipientUsername }: IRequestAssociationReqBody = req.body
        const requester = await userModel.findOne({
            username: req.user.username,
        })
        const recipient = await userModel.findOne({
            username: recipientUsername,
        })

        if (!recipient) {
            throw new Error('Recipient Does Not Exist.')
        }
        if (requester?._id.equals(recipient._id)) {
            throw new Error('You cannot associate yourself.')
        }
        // Users that are not of "parent" accountType cannot associate accounts under them.
        if (requester?.accountType !== 'parent') {
            throw new Error(
                'Only parent accounts may associate their student users.',
            )
        }
        if (
            recipient?.accountType == 'parent' ||
            recipient?.accountType == 'teacher'
        ) {
            throw new Error(
                'Parents cannot associate with other parent users or teachers.',
            )
        }

        requester.associatedUsers.forEach((associatedUser: Types.ObjectId) => {
            if (associatedUser.equals(recipient._id)) {
                throw new Error('Users Already Associated')
            }
        })

        const associationRequest = new associationRequestModel({
            requester: requester._id,
            recipient: recipient._id,
            status: 'pending',
        })

        await associationRequest.save() // await to return possible errors
        res.status(201).send('User Association Request Made.')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const actionOnAssociationRequest = async (
    req: Request,
    res: Response,
) => {
    try {
        const { associationRequestId, status }: IActionOnAssociationRequest =
            req.body
        const associationRequest = await associationRequestModel.findOne({
            _id: associationRequestId,
        })
        if (!associationRequest) {
            throw new Error('The association request does not exist.')
        }
        const requester = await userModel.findOne({
            _id: associationRequest.requester,
        })
        const recipient = await userModel.findOne({
            _id: req.user.user_id, // checking if the recipient is the one that is authenticated. Only recipients can take action so its ok
        })

        if (!requester || !recipient) {
            throw new Error('Requester or Recipient does not exist.')
        }
        if (!associationRequest.recipient.equals(recipient._id)) {
            throw new Error('Internal Server Error') // the authenticated user is not the recipient
        }

        if (status == 'accept') {
            requester.associatedUsers.push(recipient._id)
            recipient.associatedUsers.push(requester._id)
            requester.save()
            recipient.save()
            associationRequest.deleteOne()
            res.status(200).send('Users have been associated.')
        } else if (status == 'reject') {
            associationRequest.deleteOne()
            res.status(200).send('User has been denied association.')
        } else {
            throw new Error('Something went wrong!')
        }
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
