import React, { useState, useEffect, useContext } from 'react'
import { HStack, Text } from 'native-base'
import { LikePostIconMetric } from './childComponents/LikePostIconMetric'
import { CommentPostIconMetric } from './childComponents/CommentPostIconMetric'
import { SharePostIconMetric } from './childComponents/SharePostIconMetric'
import { PostEngagementMetricsContext } from '../hooks/contexts/PostEngagementMetricsProvider'
import { PostEngagementMetricsContextType } from '../types/PostEngagementMetricsTypes'
interface IPostEngagementMetrics {
    postId: string
    setShowModal?: any
}

export const PostEngagementMetrics: React.FC<IPostEngagementMetrics> = ({
    postId,
    setShowModal,
}) => {
    const { getPostEngagementMetrics, postEngagementMetrics } = useContext(
        PostEngagementMetricsContext
    ) as PostEngagementMetricsContextType

    if (!postEngagementMetrics) {
        return <Text>Loading metrics...</Text>
    }
    // Get getPostEngagementMetrics to re-run after any user-action
    useEffect(() => {
        getPostEngagementMetrics(postId)
    }, [])
    return (
        <HStack space={2}>
            <LikePostIconMetric
                likes={postEngagementMetrics?.likes}
                postId={postId}
            />

            <CommentPostIconMetric
                comments={postEngagementMetrics?.comments}
                postId={postId}
                setShowModal={setShowModal}
            />
        </HStack>
    )
}
