import { Types } from 'mongoose'
import schoolModel from '../../models/schoolSchema'

export const getSchool = async (userSchoolID: Types.ObjectId) => {
    try {
        return await schoolModel.findOne({ _id: userSchoolID })
    } catch (error) {
        throw new Error('Could not find school associated with this user.')
    }
}
