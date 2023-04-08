import React, { useContext } from 'react'
import { NavigatorScreenParams } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feather from '@expo/vector-icons/Feather'

import { FeedStackParamList, FeedStackScreens } from './stacks/feedStack'
import {
    ProfileStackScreens,
    ProfileStackParamList,
} from './stacks/profileStack'
import { UserAuthContext } from '../hooks/contexts/UserAuthProvider'
import { UserAuthContextType } from '../types/UserAuthTypes'
import { IsLoadingSplash } from '../components/others/isLoadingSplash'
import {
    MyStudentsStackParamList,
    MyStudentsStackScreens,
} from './stacks/myStudentsStack'
import {
    CalendarStackParamList,
    CalendarStackScreens,
} from './stacks/calendarStack'

export type AppBottomTabParamList = {
    Feed: NavigatorScreenParams<FeedStackParamList>
    Calendar: NavigatorScreenParams<CalendarStackParamList>
    MyStudents: NavigatorScreenParams<MyStudentsStackParamList>
    MyProfile: NavigatorScreenParams<ProfileStackParamList>
}

const AppTab = createBottomTabNavigator<AppBottomTabParamList>()

export const AppNavigation = () => {
    const { user } = useContext(UserAuthContext) as UserAuthContextType
    if (!user) {
        return <IsLoadingSplash messages="Fetching necessary info." />
    }

    return (
        <AppTab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: () => {
                    return null
                },
                headerShown: false,
                tabBarIcon: ({ focused, size }) => {
                    if (route.name === 'Feed') {
                        if (focused) {
                            return (
                                <Feather name="home" size={24} color="black" />
                            )
                        } else {
                            return (
                                <Feather name="home" size={24} color="grey" />
                            )
                        }
                    }
                    if (route.name === 'Calendar') {
                        if (focused) {
                            return (
                                <Feather
                                    name="calendar"
                                    size={24}
                                    color="black"
                                />
                            )
                        } else {
                            return (
                                <Feather
                                    name="calendar"
                                    size={24}
                                    color="grey"
                                />
                            )
                        }
                    }
                    if (
                        route.name === 'MyStudents' &&
                        user.accountType === 'parent'
                    ) {
                        if (focused) {
                            return (
                                <Feather name="smile" size={24} color="black" />
                            )
                        } else {
                            return (
                                <Feather name="smile" size={24} color="grey" />
                            )
                        }
                    }
                    if (route.name === 'MyProfile') {
                        if (focused) {
                            return (
                                <Feather name="user" size={24} color="black" />
                            )
                        } else {
                            return (
                                <Feather name="user" size={24} color="grey" />
                            )
                        }
                    }
                },
            })}
        >
            <AppTab.Screen component={FeedStackScreens} name="Feed" />
            <AppTab.Screen component={CalendarStackScreens} name="Calendar" />
            {user.accountType === 'parent' ? (
                <AppTab.Screen
                    component={MyStudentsStackScreens}
                    name="MyStudents"
                />
            ) : null}
            <AppTab.Screen component={ProfileStackScreens} name="MyProfile" />
        </AppTab.Navigator>
    )
}
