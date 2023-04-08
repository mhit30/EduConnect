import React, { useReducer, createContext, useEffect } from 'react'
import { IPost, PostContextType } from '../../types/PostTypes'
import { getUserJWTToken } from '../../utils/asyncStorage'
import { axiosClient } from '../../utils/axiosClient'
import { postsReducer } from '../reducers/postsReducer'

export const PostsContext = createContext<PostContextType>({
    posts: null,
    getPosts: async () => Promise.resolve(),
})

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(postsReducer, { posts: [] })

    useEffect(() => {
        getPosts()
    }, [])
    const getPosts = async () => {
        // this might not be the best way to do it. The authorization should all be set
        // in the login
        const jwtToken = await getUserJWTToken()
        axiosClient.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
        await axiosClient
            .get('v1/posts/getPosts')
            .then((res) => {
                addPosts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const addPosts = async (postsPayload: IPost[]) => {
        dispatch({ type: 'ADD_POSTS', payload: { ...postsPayload } })
    }

    return (
        <PostsContext.Provider
            value={{
                getPosts,
                posts: state.posts,
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}
