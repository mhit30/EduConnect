require('dotenv').config()
import { Request, Response } from 'express'
import { getErrorMessage } from '../../utils/errorMessage'
import userModel from '../../models/userSchema'
import parentMessageModel from '../../models/parentMessageSchema'
import facultyUserModel from '../../models/facultyUserSchema'
import schoolModel from '../../models/schoolSchema'

export const createParentMessage = async (req: Request, res: Response) => {
    try {
        const { title, body, studentId } = req.body

        const parent = await userModel.findOne({ _id: req.user.user_id })

        if (!parent) {
            throw new Error('Could not find account.')
        }
        const student = await userModel.findOne({ _id: studentId })
        if (!student) {
            throw new Error('Could not find student account.')
        }
        const parentMessage = new parentMessageModel({
            title: title,
            body: body,
            student: student._id,
            creator: parent._id,
            school: student.school,
        })

        await parentMessage.save()

        res.status(200).send('Message sent to faculty')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const getMyParentMessages = async (req: Request, res: Response) => {
    try {
        const parent = await userModel.findOne({
            _id: req.user.user_id,
        })
        if (!parent) {
            throw new Error('Could not find account.')
        }

        const parentMessages = await parentMessageModel
            .find({ school: parent.school._id })
            .sort({ createdAt: -1 })

        const parentMessagesRes = []

        for (let i = 0; i < parentMessages.length; i++) {
            const student = await userModel.findOne({
                _id: parentMessages[i].student,
            })

            if (!student) {
                throw new Error('An error has occurred')
            }

            parentMessagesRes.push({
                parentMessageId: parentMessages[i]._id,
                title: parentMessages[i].title,
                body: parentMessages[i].body,
                status: parentMessages[i].status,
                studentFullName: {
                    firstName: student.fullName.firstName,
                    lastName: student.fullName.lastName,
                },
                grade: student.grade,
                parentFullName: {
                    firstName: parent.fullName.firstName,
                    lastName: parent.fullName.lastName,
                },
            })
        }
        res.status(200).send(parentMessagesRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
// ! FACULTY CONTROLLERS

export const updateParentMessage = async (req: Request, res: Response) => {
    try {
        const { parentMessageId, parentMessageStatus } = req.body
        const faculty = await facultyUserModel.findOne({
            _id: req.facultyUser.user_id,
        })

        if (!faculty) {
            throw new Error('Could not find account.')
        }

        const parentMessage = await parentMessageModel.findOneAndUpdate(
            {
                _id: parentMessageId,
            },
            { status: parentMessageStatus },
        )

        await parentMessage?.save()
        res.status(200).send('An update has been made to the message.')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const getParentMessages = async (req: Request, res: Response) => {
    try {
        const faculty = await facultyUserModel.findOne({
            _id: req.facultyUser.user_id,
        })
        if (!faculty) {
            throw new Error('Could not find account.')
        }
        const school = await schoolModel.findOne({
            facultyUser: req.facultyUser.user_id,
        })
        if (!school) {
            throw new Error('Could not find school.')
        }

        const parentMessages = await parentMessageModel
            .find({ school: school._id, status: 'pending' })
            .sort({ createdAt: -1 })

        const parentMessagesRes = []

        for (let i = 0; i < parentMessages.length; i++) {
            const student = await userModel.findOne({
                _id: parentMessages[i].student,
            })
            const parent = await userModel.findOne({
                _id: parentMessages[i].creator,
            })

            if (!student) {
                throw new Error('An error has occurred')
            }
            if (!parent) {
                throw new Error('An error has occurred')
            }
            parentMessagesRes.push({
                parentMessageId: parentMessages[i]._id,
                title: parentMessages[i].title,
                body: parentMessages[i].body,
                status: parentMessages[i].status,
                studentFullName: {
                    firstName: student.fullName.firstName,
                    lastName: student.fullName.lastName,
                },
                grade: student.grade,
                parentFullName: {
                    firstName: parent.fullName.firstName,
                    lastName: parent.fullName.lastName,
                },
            })
        }
        res.status(200).send(parentMessagesRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
