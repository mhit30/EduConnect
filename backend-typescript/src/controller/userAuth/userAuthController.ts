require('dotenv').config()
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import userModel from '../../models/userSchema'
import { getErrorMessage } from '../../utils/errorMessage'
import {
    IUserAuthRes,
    IUserRegistrationReqBody,
    IUserLoginReqBody,
} from '../../utils/interfaces/userAuthInterfaces'
import { jwtSign } from '../../utils/jwtSign'
import schoolModel from '../../models/schoolSchema'
import { getRandomAvatar } from '../../utils/randomAvatar'
import { getFileUrlFromBucket } from '../../s3Client'

const avatarBucketName: any = process.env.AWS_AVATAR_BUCKET_NAME

export const userRegistration = async (req: Request, res: Response) => {
    try {
        const {
            accountType,
            grade,
            fullName,
            email,
            password,
            joinCode,
        }: IUserRegistrationReqBody = req.body
        const lowerCasedEmail: string = email.toLowerCase()
        // check if a user already exists
        const userExists = await userModel.exists({ email: lowerCasedEmail })
        if (userExists) {
            return res.status(409).send({
                message:
                    'A user is already association with this email. Please Login.',
            })
        }

        const school = await schoolModel.findOne({ joinCode: joinCode })
        if (!school) {
            return res.status(404).send({
                message: 'Could not find a school to associate with.',
            })
        }
        if (accountType == 'student' && !grade) {
            return res.status(404).send({
                message: 'A student account must have a grade level.',
            })
        }
        if (accountType == 'teacher' && grade) {
            return res.status(404).send({
                message: 'A teacher account cannot have a grade level.',
            })
        }
        if (accountType == 'parent' && grade) {
            return res.status(404).send({
                message: 'A parent account cannot have a grade level.',
            })
        }
        const user = new userModel({
            accountType: accountType,
            grade: grade ? grade : null,
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
            },
            email: lowerCasedEmail,
            password: password,
            school: school._id, // in case school is null
        })

        // Information being stored in JWT Token
        user.jwtToken = jwtSign({
            accountType: user.accountType,
            username: lowerCasedEmail.slice(0, lowerCasedEmail.indexOf('@')),
            user_id: user._id,
        })

        await user.save() // await so field invalid errors get returned

        const userSchool = await schoolModel.findOne({ _id: user.school })
        if (!userSchool) {
            throw new Error('Could not find necessary user info.')
        }
        const userAuthRes: IUserAuthRes = {
            accountType: user.accountType,
            grade: user.grade,
            fullName: {
                firstName: user.fullName.firstName,
                lastName: user.fullName.lastName,
            },
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarName
                ? user.avatarName
                : getRandomAvatar(user.fullName.firstName),
            associatedUsers: user.associatedUsers,
            minSchoolInfo: {
                name: userSchool.name,
                address: {
                    city: userSchool.address.city,
                    state: userSchool.address.state,
                },
            },
            jwtToken: user.jwtToken,
        }
        res.status(201).json(userAuthRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { username, password }: IUserLoginReqBody = req.body
        if (!(username && password)) {
            throw new Error('Please input both fields.')
        }
        // Find existing user via username
        const user = await userModel.findOne({ username: username })
        if (!user) {
            throw new Error(
                'A user associated with this username/password does not exist.',
            )
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (passwordValid) {
            user.jwtToken = jwtSign({
                accountType: user.accountType,
                username: user.username,
                user_id: user._id,
            })

            await user.save()
            const userSchool = await schoolModel.findOne({ _id: user.school })
            if (!userSchool) {
                throw new Error('Could not find necessary user info.')
            }

            let avatarUrl = await getFileUrlFromBucket(
                avatarBucketName,
                user.avatarName,
            )

            const userAuthRes: IUserAuthRes = {
                accountType: user.accountType,
                grade: user.grade,
                fullName: {
                    firstName: user.fullName.firstName,
                    lastName: user.fullName.lastName,
                },
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarName
                    ? avatarUrl
                    : getRandomAvatar(user.fullName.firstName),
                associatedUsers: user.associatedUsers,
                minSchoolInfo: {
                    name: userSchool.name,
                    address: {
                        city: userSchool.address.city,
                        state: userSchool.address.state,
                    },
                },
                jwtToken: user.jwtToken,
            }
            res.status(201).json(userAuthRes)
        } else {
            throw new Error('Your credentials are incorrect.')
        }
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

// Req type is CustomRequest because it includes the jwt payload
export const userLogout = async (req: Request, res: Response) => {
    try {
        res.status(200).send('Sign out successful.')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
