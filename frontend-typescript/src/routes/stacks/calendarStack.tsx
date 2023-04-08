import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CalendarOverviewScreen } from '../../screens/Calendar/CalendarScreen'
import { EventsProvider } from '../../hooks/contexts/EventsContextProvider'

export type CalendarStackParamList = {
    CalendarOverview: undefined
}
export type CalendarOverviewProps = NativeStackScreenProps<
    CalendarStackParamList,
    'CalendarOverview'
>

const CalendarStack = createStackNavigator<CalendarStackParamList>()

export const CalendarStackScreens = () => {
    return (
        <EventsProvider>
            <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
                <CalendarStack.Screen
                    component={CalendarOverviewScreen}
                    name="CalendarOverview"
                />
            </CalendarStack.Navigator>
        </EventsProvider>
    )
}
