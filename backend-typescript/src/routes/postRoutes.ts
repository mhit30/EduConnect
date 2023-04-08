import express from 'express'
import {
    createPost,
    getPosts,
    updatePostLikes,
    getPostComments,
    createPostComment,
    getPostEngagementMetrics,
} from '../controller/post/postController'
import { verifyToken } from '../middleware/authMiddleware'
import { filterUnauthorizedPostersAccountTypeMiddleware } from '../middleware/accountTypeMiddleware'
import { multerUpload } from '../utils/multerUpload'
const postRouter = express.Router()

postRouter.post(
    '/createPost',
    verifyToken,
    filterUnauthorizedPostersAccountTypeMiddleware,
    multerUpload.single('post-image'),
    createPost,
)
postRouter.get('/getPosts', verifyToken, getPosts)
postRouter.put('/updatePostLikes', verifyToken, updatePostLikes)
postRouter.post('/getPostComments', verifyToken, getPostComments) // post request because its using postId sent from client
postRouter.post('/createPostComment', verifyToken, createPostComment)
postRouter.post(
    '/getPostEngagementMetrics',
    verifyToken,
    getPostEngagementMetrics,
)
export default postRouter
