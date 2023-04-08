require('dotenv').config()
import { Request, Response } from 'express'
import postModel from '../../models/postSchema'
import commentModel from '../../models/commentSchema'
import { getErrorMessage } from '../../utils/errorMessage'
import {
    ICreatePostCommentReqBody,
    IGetPostCommentReqBody,
    IGetPostEngagementMetricsReqBody,
    IGetPostEngagementMetricsResBody,
    IPostCommentsRes,
    IPostReqBody,
    IPostRes,
    IUpdatePostLikesReqBody,
} from '../../utils/interfaces/postInterfaces'
import { getFileUrlFromBucket, putFileInBucket } from '../../s3Client'
import { getUUID } from '../../utils/randomValues'
import userModel from '../../models/userSchema'
import { getRandomAvatar } from '../../utils/randomAvatar'
import { formatDate } from '../../utils/formatDate'
const postImageBucketName: any = process.env.AWS_POST_IMAGE_BUCKET_NAME
const avatarBucketName: any = process.env.AWS_AVATAR_BUCKET_NAME

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, description }: IPostReqBody = req.body
        const user = await userModel.findOne({ _id: req.user.user_id })
        if (!user) {
            throw new Error('Could not find user info')
        }
        const file = req.file ? req.file : null
        let randomFileName: string | null = null
        if (file) {
            randomFileName = getUUID()
            await putFileInBucket(
                postImageBucketName,
                randomFileName,
                file.buffer,
                file.mimetype,
            )
        }
        const post = new postModel({
            title: title,
            description: description,
            imageName: randomFileName,
            creator: req.user.user_id,
            school: user.school,
        })

        await post.save()
        res.status(201).send('New Post Created')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const user = await userModel.findOne({ _id: req.user.user_id })
        if (!user) {
            throw new Error('Could not find user info')
        }
        const schoolPosts = await postModel
            .find({ school: user?.school })
            .sort({ createdAt: -1 })
        const postsRes: Array<IPostRes> = []
        for (let i = 0; i < schoolPosts.length; i++) {
            const post = schoolPosts[i]
            const creator = await userModel
                .findOne({ _id: post.creator })
                .select('username fullName')
            if (!creator) {
                throw new Error(
                    'Could not find the user that uploaded the post.',
                )
            }
            let postImageUrl: string | undefined = undefined
            if (post.imageName) {
                postImageUrl = await getFileUrlFromBucket(
                    postImageBucketName,
                    post.imageName,
                )
            }
            let avatarUrl = await getFileUrlFromBucket(
                avatarBucketName,
                user.avatarName,
            )
            postsRes.push({
                title: post.title,
                description: post.description,
                imageUrl: postImageUrl,
                creator: {
                    username: creator.username,
                    avatarUrl: creator.avatarName
                        ? avatarUrl
                        : getRandomAvatar(creator.fullName.firstName),
                    fullName: {
                        firstName: creator.fullName.firstName,
                        lastName: creator.fullName.lastName,
                    },
                },
                school: post.school,
                formattedDate: formatDate(post.createdAt), // change this later so that its the actual date.
                postId: post._id,
            })
        }
        res.status(200).send(postsRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const updatePostLikes = async (req: Request, res: Response) => {
    try {
        const { isLiked, postId }: IUpdatePostLikesReqBody = req.body
        const user = await userModel.findOne({ _id: req.user.user_id })
        if (!user) {
            throw new Error('Could not find user info')
        }
        const post = await postModel.findOne({ _id: postId })
        if (!post) {
            throw new Error('Could not find the post to like')
        }
        if (isLiked) {
            await post.engagement.likes.push(user._id)
        } else {
            const likeIndex = post.engagement.likes.indexOf(user._id)
            if (likeIndex != -1) {
                await post.engagement.likes.splice(likeIndex, 1)
            }
        }
        post.save()
        res.status(200).send('Likes updated successfully')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const createPostComment = async (req: Request, res: Response) => {
    try {
        const { commentBody, postId }: ICreatePostCommentReqBody = req.body
        const user = await userModel.findOne({ _id: req.user.user_id })
        if (!user) {
            throw new Error('Could not find user info.')
        }
        const post = await postModel.findOne({ _id: postId })
        if (!post) {
            throw new Error('This post does not exist')
        }
        const comment = new commentModel({
            commentBody: commentBody,
            post: postId,
            commentCreator: user._id,
        })
        await comment.save()
        await post.engagement.comments.push(comment._id)
        await post.save()
        res.status(200).send('Comment created successfully')
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const getPostComments = async (req: Request, res: Response) => {
    try {
        const { postId }: IGetPostCommentReqBody = req.body
        const user = await userModel.findOne({ _id: req.user.user_id })
        if (!user) {
            throw new Error('Could not find user info.')
        }
        const post = await postModel.findOne({ _id: postId })
        if (!post) {
            throw new Error('Post does not exist')
        }
        const postComments = await commentModel
            .find({ post: postId })
            .sort({ createdAt: -1 })
        if (!postComments) {
            res.status(200).send('No comments on this post')
        }

        const postCommentsRes: Array<IPostCommentsRes> = []
        for (let i = 0; i < postComments.length; i++) {
            const postComment = postComments[i]
            const commentCreator = await userModel.findOne({
                _id: postComment.commentCreator,
            })
            if (!commentCreator) {
                throw new Error('Could not find the person who commented.')
            }
            let commentCreatorAvatarUrl = await getFileUrlFromBucket(
                avatarBucketName,
                commentCreator.avatarName,
            )

            postCommentsRes.push({
                commentBody: postComment.commentBody,
                commentCreator: {
                    username: commentCreator.username,
                    fullName: {
                        firstName: commentCreator.fullName.firstName,
                        lastName: commentCreator.fullName.lastName,
                    },
                    avatarUrl: commentCreatorAvatarUrl
                        ? commentCreatorAvatarUrl
                        : getRandomAvatar(commentCreator.fullName.firstName),
                },
                formattedDate: formatDate(postComment.createdAt),
                postId: post._id,
                commentId: commentCreator._id,
            })
        }

        res.status(200).send(postCommentsRes)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}

export const getPostEngagementMetrics = async (req: Request, res: Response) => {
    try {
        const { postId }: IGetPostEngagementMetricsReqBody = req.body
        const user = await userModel.findOne({ _id: req.user.user_id })
        if (!user) {
            throw new Error('Could not find user info.')
        }
        const post = await postModel.findOne({ _id: postId })
        if (!post) {
            throw new Error('This post does not exist')
        }
        const postEngagementDetails: IGetPostEngagementMetricsResBody = {
            likes: post.engagement.likes.length,
            comments: post.engagement.comments.length,
            shares: post.engagement.shares,
        }
        res.status(200).send(postEngagementDetails)
    } catch (error) {
        res.status(500).send(getErrorMessage(error))
    }
}
