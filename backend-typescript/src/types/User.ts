import mongoose from 'mongoose'
// Declaring type for user which will be an extension of Request
export type User = {
    accountType: string
    username: string
    user_id: mongoose.Types.ObjectId
    jwtToken?: string | null
}

export type FacultyUser = {
    email: string
    user_id: mongoose.Types.ObjectId
    jwtToken?: string | null
}
