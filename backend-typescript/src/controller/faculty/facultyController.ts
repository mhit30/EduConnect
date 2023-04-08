require('dotenv').config()
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import facultyUserModel from '../../models/facultyUserSchema'
import schoolModel from '../../models/schoolSchema'
import { getErrorMessage } from '../../utils/errorMessage'
import {
    ISchoolRegistrationReqBody,
    ICheckSchoolJoinCodeReqBody,
    ICheckSchoolJoinCodeResBody,
    IFacultyRegistrationReqBody,
    IFacultyRegistrationResBody,
    IFacultyLoginReqBody,
    IFacultyLoginResBody,
    IGetFacultyInfoResBody,
    IGetSchoolInfoResBody,
} from '../../utils/interfaces/facultyInterfaces'
import { facultyUserJWTSign, jwtSign } from '../../utils/jwtSign'

// FACULTY ACCOUNT

export const getMyFacultyUserInfo = async (req: Request, res: Response) => {
    try {
        const facultyUser = await facultyUserModel.findOne({
            _id: req.facultyUser.user_id,
        })

        if (!facultyUser) {
            throw new Error('Could not find faculty user info.')
        }

        const facultyUserRes = {
            accountHolderFullName: {
                firstName: facultyUser.accountHolderFullName.firstName,
                lastName: facultyUser.accountHolderFullName.lastName,
            },
            email: facultyUser.email,
            user_id: facultyUser._id,
            jwtToken: facultyUser.jwtToken,
        }
        res.status(200).send(facultyUserRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
export const facultyUserRegistration = async (req: Request, res: Response) => {
    try {
        const { accountHolderFullName, email, password } = req.body
        const lowerCasedEmail: string = email.toLowerCase()

        const facultyUserExists = await facultyUserModel.exists({
            email: lowerCasedEmail,
        })

        if (facultyUserExists) {
            return res.status(409).send({
                message:
                    'A faculty user is already association with this email. Please Login.',
            })
        }

        const facultyUser = new facultyUserModel({
            accountHolderFullName: {
                firstName: accountHolderFullName.firstName,
                lastName: accountHolderFullName.lastName,
            },
            email: lowerCasedEmail,
            password: password,
        })

        facultyUser.jwtToken = facultyUserJWTSign({
            email: facultyUser.email,
            user_id: facultyUser._id,
        })

        await facultyUser.save()

        const facultyUserAuthRes = {
            accountHolderFullName: {
                firstName: facultyUser.accountHolderFullName.firstName,
                lastName: facultyUser.accountHolderFullName.lastName,
            },
            email: facultyUser.email,
            user_id: facultyUser._id,
            jwtToken: facultyUser.jwtToken,
        }
        res.status(201).send(facultyUserAuthRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
export const facultyUserLogout = async (req: Request, res: Response) => {
    try {
        res.status(200).send('Sign out successful.')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
export const facultyUserLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            throw new Error('Please input both fields.')
        }
        const lowerCasedEmail: string = email.toLowerCase()

        const facultyUser = await facultyUserModel.findOne({
            email: lowerCasedEmail,
        })
        if (!facultyUser) {
            throw new Error(
                'A faculty user associated with this email/password does not exist.',
            )
        }
        const passwordValid = await bcrypt.compare(
            password,
            facultyUser.password,
        )
        if (passwordValid) {
            facultyUser.jwtToken = facultyUserJWTSign({
                email: facultyUser.email,
                user_id: facultyUser._id,
            })
            const facultyUserAuthRes = {
                accountHolderFullName: {
                    firstName: facultyUser.accountHolderFullName.firstName,
                    lastName: facultyUser.accountHolderFullName.lastName,
                },
                email: facultyUser.email,
                user_id: facultyUser._id,
                jwtToken: facultyUser.jwtToken,
            }

            res.status(201).send(facultyUserAuthRes)
        } else {
            throw new Error('Your credentials are incorrect.')
        }
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
export const getSchoolInfo = async (req: Request, res: Response) => {
    try {
        const facultyUser = await facultyUserModel.findOne({
            _id: req.facultyUser.user_id,
        })
        if (!facultyUser) {
            throw new Error('Faculty does not exist')
        }
        const school = await schoolModel.findOne({
            facultyUser: facultyUser._id,
        })
        if (!school) {
            throw new Error('School does not exist')
        }

        const getSchoolInfoRes: IGetSchoolInfoResBody = {
            name: school.name,
            address: {
                street: school.address.street,
                city: school.address.city,
                zip: school.address.zip,
                state: school.address.state,
                country: school.address.country,
            },
            joinCode: school.joinCode,
        }
        res.status(200).send(getSchoolInfoRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
export const schoolRegistration = async (req: Request, res: Response) => {
    try {
        const { name, address }: ISchoolRegistrationReqBody = req.body
        const facultyUser = req.facultyUser
        const school = new schoolModel({
            name: name,
            address: {
                street: address.street,
                city: address.city,
                zip: address.zip,
                state: address.state,
                country: address.country,
            },
            facultyUser: facultyUser.user_id,
        })
        school.save()
        res.status(200).send('School Registered on EduConnect')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
export const checkSchoolJoinCode = async (req: Request, res: Response) => {
    try {
        const { schoolJoinCode }: ICheckSchoolJoinCodeReqBody = req.body
        const schoolExists = await schoolModel.findOne({
            joinCode: schoolJoinCode,
        })
        if (!schoolExists) {
            throw new Error('Invalid school join code.')
        }
        const schoolInfo: ICheckSchoolJoinCodeResBody = {
            name: schoolExists.name,
            address: {
                street: schoolExists.address.street,
                city: schoolExists.address.city,
                zip: schoolExists.address.zip,
                state: schoolExists.address.state,
                country: schoolExists.address.country,
            },
        }
        res.status(200).send(schoolInfo)
    } catch (error) {
        res.status(500).send({ message: getErrorMessage(error) })
    }
}
