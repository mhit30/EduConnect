import React, { useReducer, createContext } from 'react'
import {
    IPostComment,
    PostCommentsContextType,
} from '../../types/PostCommentsTypes'
import { axiosClient } from '../../utils/axiosClient'
import { postCommentsReducer } from '../reducers/postCommentsReducer'

export const PostCommentsContext = createContext<PostCommentsContextType>({
    postComments: null,
    getPostComments: async () => Promise.resolve(),
})

export const PostCommentsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(postCommentsReducer, {
        postComments: [],
    })

    const getPostComments = async (postId: string) => {
        await axiosClient
            .post('v1/posts/getPostComments', { postId: postId })
            .then((res) => {
                addPostComments(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addPostComments = async (postCommentsPayload: IPostComment[]) => {
        dispatch({
            type: 'ADD_POST_COMMENTS',
            payload: { ...postCommentsPayload },
        })
    }
    return (
        <PostCommentsContext.Provider
            value={{ getPostComments, postComments: state.postComments }}
        >
            {children}
        </PostCommentsContext.Provider>
    )
}
