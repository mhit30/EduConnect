import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LatestScreen } from '../../screens/Feed/LatestScreen'
import { PostsProvider } from '../../hooks/contexts/PostsProvider'
import { UserAuthContext } from '../../hooks/contexts/UserAuthProvider'
import { UserAuthContextType } from '../../types/UserAuthTypes'
import { IsolatedPostScreen } from '../../screens/Feed/IsolatedPostScreen'
import { IIsolatedPost } from '../../types/PostTypes'

export type FeedStackParamList = {
    Latest: { accountType: string }
    IsolatedPost: IIsolatedPost
}
export type LatestScreenProps = NativeStackScreenProps<
    FeedStackParamList,
    'Latest'
>

export type IsolatedPostScreenProps = NativeStackScreenProps<
    FeedStackParamList,
    'IsolatedPost'
>

const FeedStack = createStackNavigator<FeedStackParamList>()

export const FeedStackScreens = () => {
    const { user } = useContext(UserAuthContext) as UserAuthContextType
    return (
        <PostsProvider>
            <FeedStack.Navigator screenOptions={{ headerShown: false }}>
                <FeedStack.Screen
                    component={LatestScreen}
                    name="Latest"
                    initialParams={{ accountType: user?.accountType }}
                />
                <FeedStack.Screen
                    component={IsolatedPostScreen}
                    name="IsolatedPost"
                />
            </FeedStack.Navigator>
        </PostsProvider>
    )
}
