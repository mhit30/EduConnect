export interface IPostEngagementMetrics {
    comments: number
    likes: number
    shares: number
}

export type PostEngagementMetricsContextType = {
    postEngagementMetrics: IPostEngagementMetrics | null
    getPostEngagementMetrics: (postId: string) => Promise<void>
}

export type PostEngagementMetricsAction = {
    type: 'ADD_POST_ENGAGEMENT_METRICS'
    payload: IPostEngagementMetrics
}
