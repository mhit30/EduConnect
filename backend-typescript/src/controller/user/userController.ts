require('dotenv').config()
import { Request, Response } from 'express'
import schoolModel from '../../models/schoolSchema'
import userModel from '../../models/userSchema'
import { getFileUrlFromBucket, putFileInBucket } from '../../s3Client'
import { getErrorMessage } from '../../utils/errorMessage'
import { IAssociatedUsersRes } from '../../utils/interfaces/associatedUsersInterface'
import { IUserRes } from '../../utils/interfaces/shared/userInterface'
import { getRandomAvatar } from '../../utils/randomAvatar'
import { getUUID } from '../../utils/randomValues'

const avatarBucketName: any = process.env.AWS_AVATAR_BUCKET_NAME

export const getMyUserInfo = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findOne({ _id: req.user.user_id })
        if (!user) {
            throw new Error('Could not find user info')
        }
        const userSchool = await schoolModel.findOne({ _id: user.school })

        if (!userSchool) {
            throw new Error('Could not find necessary user info.')
        }

        let avatarUrl = await getFileUrlFromBucket(
            avatarBucketName,
            user.avatarName,
        )

        const userRes: IUserRes = {
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
        }
        res.status(200).send(userRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const file = req.file
        const randomFileName: string = getUUID()
        if (file) {
            await putFileInBucket(
                avatarBucketName,
                randomFileName,
                file.buffer,
                file.mimetype,
            )
        }
        const user = await userModel.findOneAndUpdate(
            { _id: req.user.user_id },
            { avatarName: randomFileName },
        )
        if (!user) {
            throw new Error('Could not find user info')
        }

        await user.save()

        const userSchool = await schoolModel.findOne({ _id: user.school })

        if (!userSchool) {
            throw new Error('Could not find necessary user info.')
        }

        let avatarUrl = await getFileUrlFromBucket(
            avatarBucketName,
            user.avatarName,
        )

        const userRes: IUserRes = {
            accountType: user.accountType,
            grade: user.grade,
            fullName: {
                firstName: user.fullName.firstName,
                lastName: user.fullName.lastName,
            },
            username: user.username,
            email: user.email,
            avatarUrl: avatarUrl,
            associatedUsers: user.associatedUsers,
            minSchoolInfo: {
                name: userSchool.name,
                address: {
                    city: userSchool.address.city,
                    state: userSchool.address.state,
                },
            },
        }
        res.status(200).send(userRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
export const getAssociatedUsers = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findOne({ _id: req.user.user_id })
        if (!user) {
            throw new Error('Could not find user info')
        }
        const associatedUsers = user.associatedUsers

        const associatedUsersRes: Array<IAssociatedUsersRes> = []
        for (let i = 0; i < associatedUsers.length; i++) {
            const associatedUser = await userModel.findOne({
                _id: associatedUsers[i]._id,
            })
            if (!associatedUser) {
                throw new Error('An error has occurred')
            }

            const associatedUserAvatarUrl = await getFileUrlFromBucket(
                avatarBucketName,
                associatedUser.avatarName,
            )
            associatedUsersRes.push({
                associatedUserId: associatedUser._id,
                associatedUserUsername: associatedUser.username,
                associatedUserFullName: {
                    firstName: associatedUser.fullName.firstName,
                    lastName: associatedUser.fullName.lastName,
                },
                associatedUserGrade: associatedUser.grade, // given the middleware, grade will never be null
                associatedUserAvatarUrl: associatedUser.avatarName
                    ? associatedUserAvatarUrl
                    : getRandomAvatar(associatedUser.fullName.firstName),
            })
            res.status(200).send(associatedUsersRes)
        }
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
