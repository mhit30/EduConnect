import { Reducer } from 'react'
import {
    IPostEngagementMetrics,
    PostEngagementMetricsAction,
} from '../../types/PostEngagementMetricsTypes'

export const postEngagementMetricsReducer: Reducer<
    { postEngagementMetrics: IPostEngagementMetrics },
    PostEngagementMetricsAction
> = (state, action) => {
    switch (action.type) {
        case 'ADD_POST_ENGAGEMENT_METRICS':
            return { ...state, postEngagementMetrics: action.payload }
        default:
            return state
    }
}
