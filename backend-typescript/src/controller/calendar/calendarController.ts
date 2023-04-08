require('dotenv').config()
import { Request, Response } from 'express'
import eventModel from '../../models/eventSchema'
import facultyUserModel from '../../models/facultyUserSchema'
import schoolModel from '../../models/schoolSchema'
import userModel from '../../models/userSchema'
import { getErrorMessage } from '../../utils/errorMessage'
import {
    ICreateEventReqBody,
    IUpdateEventWithRSVP,
} from '../../utils/interfaces/eventInterface'

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, description, eventType, eventDate }: ICreateEventReqBody =
            req.body

        const facultyUser = await facultyUserModel.findOne({
            _id: req.facultyUser.user_id,
        })
        if (!facultyUser) {
            throw new Error('Faculty user does not exist')
        }

        const school = await schoolModel.findOne({
            facultyUser: facultyUser._id,
        })
        if (!school) {
            throw new Error('School does not exists.')
        }
        const event = new eventModel({
            name: name,
            description: description,
            eventType: eventType,
            eventDate: eventDate, // TODO CHANGE TO EVENT DATE
            school: school._id,
            eventCreator: facultyUser._id,
        })

        await event.save()

        res.status(200).send('New event created successfully')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const updateEventWithRSVP = async (req: Request, res: Response) => {
    try {
        const { updateType, eventId }: IUpdateEventWithRSVP = req.body
        const user = await userModel.findOne({
            _id: req.user.user_id,
        })
        if (!user) {
            throw new Error('Faculty user does not exist')
        }

        const event = await eventModel.findOne({ _id: eventId })
        if (!event) {
            throw new Error('Could not find the event')
        }
        if (updateType == 'RSVP') {
            await event.RSVPs?.push(user._id)
        }

        await event.save()
        res.status(200).send('Name applied to event.')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
// ! THIS ROUTE IS FACULTY ONLY
export const getEventsFaculty = async (req: Request, res: Response) => {
    try {
        const facultyUser = await facultyUserModel.findOne({
            _id: req.facultyUser.user_id,
        })
        if (!facultyUser) {
            throw new Error('Faculty user does not exist')
        }
        const school = await schoolModel.findOne({
            facultyUser: facultyUser._id,
        })
        if (!school) {
            throw new Error('School does not exists.')
        }

        const events = await eventModel
            .find({ school: school._id })
            .sort({ createdAt: -1 })

        res.status(200).send(events)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const getEventsUsers = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findOne({
            _id: req.user.user_id,
        })
        if (!user) {
            throw new Error('Faculty user does not exist')
        }

        const events = await eventModel
            .find({ school: user.school._id })
            .sort({ createdAt: -1 })
        res.status(200).send(events)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
