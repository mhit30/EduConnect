import React, { useReducer, createContext, useEffect } from 'react'
import {
    IPostEngagementMetrics,
    PostEngagementMetricsContextType,
} from '../../types/PostEngagementMetricsTypes'
import { axiosClient } from '../../utils/axiosClient'
import { postEngagementMetricsReducer } from '../reducers/postEngagementMetricsReducer'

export const PostEngagementMetricsContext =
    createContext<PostEngagementMetricsContextType>({
        postEngagementMetrics: null,
        getPostEngagementMetrics: async (postId: string) => Promise.resolve(),
    })

export const PostEngagementMetricsProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [state, dispatch] = useReducer(postEngagementMetricsReducer, {
        postEngagementMetrics: { comments: 0, likes: 0, shares: 0 },
    })

    const getPostEngagementMetrics = async (postId: string) => {
        await axiosClient
            .post('v1/posts/getPostEngagementMetrics', { postId: postId })
            .then((res) => {
                addPostEngagementMetrics(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addPostEngagementMetrics = async (
        postEngagementMetricsPayload: IPostEngagementMetrics
    ) => {
        dispatch({
            type: 'ADD_POST_ENGAGEMENT_METRICS',
            payload: { ...postEngagementMetricsPayload },
        })
    }

    return (
        <PostEngagementMetricsContext.Provider
            value={{
                getPostEngagementMetrics,
                postEngagementMetrics: state.postEngagementMetrics,
            }}
        >
            {children}
        </PostEngagementMetricsContext.Provider>
    )
}
