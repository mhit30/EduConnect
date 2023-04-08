import React, { useContext } from 'react'
// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { RootStackScreens } from './routes/rootNavigation'
import { UserAuthContext } from './hooks/contexts/UserAuthProvider'
import { UserAuthContextType } from './types/UserAuthTypes'

export const Index: React.FC = () => {
    const { isAuthenticated } = useContext(
        UserAuthContext
    ) as UserAuthContextType

    return (
        <NavigationContainer>
            <RootStackScreens isAuthenticated={isAuthenticated} />
        </NavigationContainer>
    )
}
