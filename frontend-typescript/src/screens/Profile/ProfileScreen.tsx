import React, { useContext } from 'react'
import { View, Box, Heading, Flex, Text, Center, IconButton } from 'native-base'
import { TouchableOpacity } from 'react-native'
import BaseScreen from '../BaseScreen'
import { CustomAvatar } from '../../components/CustomAvatar'
import { UserAuthContext } from '../../hooks/contexts/UserAuthProvider'
import { UserAuthContextType } from '../../types/UserAuthTypes'
import { ProfileProps } from '../../routes/stacks/profileStack'
import Feather from '@expo/vector-icons/Feather'
import { UserLogoutForm } from '../../modules/userAuth/userLogoutForm'

export const ProfileScreen = ({ navigation, route }: ProfileProps) => {
    const { user } = useContext(UserAuthContext) as UserAuthContextType

    const renderStudentComponents = () => {
        if (user?.accountType === 'student') {
            return (
                <IconButton
                    colorScheme="custom_primary"
                    size="md"
                    variant="ghost"
                    _icon={{ as: Feather, name: 'bell' }}
                    onPress={() =>
                        navigation.navigate('UserAssociationRequests')
                    }
                />
            )
        }
    }
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <BaseScreen />

            <View>
                <Flex direction="row" justifyContent="space-between">
                    <Heading>My Profile</Heading>
                    {renderStudentComponents()}
                </Flex>
                <Center mt={4}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Account')}
                    >
                        <CustomAvatar avatarUrl={user?.avatarUrl} />
                    </TouchableOpacity>
                    <View mt={4}>
                        <Center>
                            <Text fontSize={'xl'}>
                                {user?.fullName.firstName}{' '}
                                {user?.fullName.lastName}
                            </Text>
                            <Text color="custom_primary.500">
                                @{user?.username}
                            </Text>
                        </Center>
                    </View>
                </Center>
                <UserLogoutForm />
            </View>
        </Box>
    )
}
