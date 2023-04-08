import React, { useContext } from 'react'
import {
    View,
    Box,
    Heading,
    Flex,
    Text,
    VStack,
    Divider,
    Center,
} from 'native-base'
import BaseScreen from '../BaseScreen'
import { UserAuthContext } from '../../hooks/contexts/UserAuthProvider'
import { UserAuthContextType } from '../../types/UserAuthTypes'
import { AccountProps } from '../../routes/stacks/profileStack'
import { CustomAvatar } from '../../components/CustomAvatar'
import { AccountEditForm } from '../../modules/account/accountEditForm'

export const AccountScreen = ({ navigation, route }: AccountProps) => {
    const { user } = useContext(UserAuthContext) as UserAuthContextType
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <BaseScreen />
            <View>
                <Flex direction="row" justifyContent="space-between">
                    <Heading>My Account</Heading>
                </Flex>
                <Center mt={4}>
                    <CustomAvatar avatarUrl={user?.avatarUrl} />
                    <AccountEditForm />
                </Center>
                <View mt={4}>
                    <Text fontSize="md">Account Info</Text>
                    <VStack mt={4} space={2} divider={<Divider />}>
                        <Text>Account type: {user?.accountType}</Text>
                        <Text>
                            Full name: {user?.fullName.firstName}{' '}
                            {user?.fullName.lastName}
                        </Text>
                        <Text>Username: {user?.username}</Text>
                    </VStack>
                </View>
                <View mt={4}>
                    <Text fontSize="md">School Info</Text>
                    <VStack mt={4} space={2} divider={<Divider />}>
                        <Text>School name: {user?.minSchoolInfo.name}</Text>
                        <Text>
                            School Location: {user?.minSchoolInfo.address.city},{' '}
                            {user?.minSchoolInfo.address.state}
                        </Text>
                    </VStack>
                </View>
            </View>
        </Box>
    )
}
