import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ProfileScreen } from '../../screens/Profile/ProfileScreen'
import { AccountScreen } from '../../screens/Profile/AccountScreen'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { UserAssociationRequestsScreen } from '../../screens/Profile/UserAssociationRequestsScreen'
import { UserAssociationRequestsProvider } from '../../hooks/contexts/UserAssociationRequestsProvider'
import { UserAuthContext } from '../../hooks/contexts/UserAuthProvider'
import { UserAuthContextType } from '../../types/UserAuthTypes'

export type ProfileStackParamList = {
    Profile: { accountType: string }
    Account: undefined
    UserAssociationRequests: undefined
}

// #region
export type ProfileProps = NativeStackScreenProps<
    ProfileStackParamList,
    'Profile'
>
export type AccountProps = NativeStackScreenProps<
    ProfileStackParamList,
    'Account'
>
export type UserAssociationRequestsProps = NativeStackScreenProps<
    ProfileStackParamList,
    'UserAssociationRequests'
>
const ProfileStack = createStackNavigator<ProfileStackParamList>()

// #endregion
export const ProfileStackScreens = () => {
    const { user } = useContext(UserAuthContext) as UserAuthContextType

    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen component={ProfileScreen} name="Profile" />
            <ProfileStack.Screen component={AccountScreen} name="Account" />
            <ProfileStack.Screen
                component={UserAssociationRequestsScreen}
                name="UserAssociationRequests"
            />
        </ProfileStack.Navigator>
    )
}
