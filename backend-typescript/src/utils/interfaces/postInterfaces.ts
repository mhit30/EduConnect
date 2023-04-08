import { Types } from 'mongoose'

export interface IPostReqBody {
    title: string
    description: string
}

export interface IPostRes {
    title: string
    description: string
    imageUrl?: string // imageName will be the random image name
    creator: {
        username: string
        fullName: {
            firstName: string
            lastName: string
        }
        avatarUrl: string
    }
    school: Types.ObjectId
    formattedDate: string
    postId: Types.ObjectId
}

export interface IPostCommentsRes {
    commentBody: string
    commentCreator: {
        username: string
        fullName: {
            firstName: string
            lastName: string
        }
        avatarUrl: string
    }
    formattedDate: string
    postId: Types.ObjectId
    commentId: Types.ObjectId
}

export interface IUpdatePostLikesReqBody {
    isLiked: boolean
    postId: Types.ObjectId
}

export interface ICreatePostCommentReqBody {
    commentBody: string
    postId: Types.ObjectId
}

export interface IGetPostCommentReqBody {
    postId: Types.ObjectId
}

export interface IGetPostEngagementMetricsReqBody {
    postId: Types.ObjectId
}
export interface IGetPostEngagementMetricsResBody {}
