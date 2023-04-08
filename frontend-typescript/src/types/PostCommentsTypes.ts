export interface IPostComment {
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
    postId: string
    commentId: string
}

export type PostCommentsContextType = {
    postComments: IPostComment[] | null
    getPostComments: (postId: string) => Promise<void>
}

export type PostCommentsAction = {
    type: 'ADD_POST_COMMENTS'
    payload: IPostComment[]
}
