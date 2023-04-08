import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MyStudentsOverviewScreen } from '../../screens/MyStudents/MyStudentsScreen'
import { AssociatedUsersProvider } from '../../hooks/contexts/AssociatedUsersProvider'
import { MyParentMessagesScreen } from '../../screens/MyStudents/MyParentMessagesScreen'
import { ParentMessagesProvider } from '../../hooks/contexts/ParentMessagesProvider'

export type MyStudentsStackParamList = {
    MyStudentsOverview: undefined
    MyParentMessages: undefined
}

// #region
export type MyStudentsProp = NativeStackScreenProps<
    MyStudentsStackParamList,
    'MyStudentsOverview'
>

export type MyParentMessagesProps = NativeStackScreenProps<
    MyStudentsStackParamList,
    'MyParentMessages'
>

const MyStudentsStack = createStackNavigator<MyStudentsStackParamList>()

// #endregion
export const MyStudentsStackScreens = () => {
    return (
        <AssociatedUsersProvider>
            <ParentMessagesProvider>
                <MyStudentsStack.Navigator
                    screenOptions={{ headerShown: false }}
                >
                    <MyStudentsStack.Screen
                        component={MyStudentsOverviewScreen}
                        name="MyStudentsOverview"
                    />
                    <MyStudentsStack.Screen
                        component={MyParentMessagesScreen}
                        name="MyParentMessages"
                    />
                </MyStudentsStack.Navigator>
            </ParentMessagesProvider>
        </AssociatedUsersProvider>
    )
}
