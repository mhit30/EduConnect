import React from 'react'
import { Heading, Box, View, Text, Center, ScrollView } from 'native-base'
import {
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native'

import { UserRegistrationScreenProps } from '../../routes/stacks/authStack'

import BaseScreen from '../BaseScreen'
import { UserRegistrationForm } from '../../modules/userAuth/userRegistrationForm'
// Forms

export const UserRegistrationScreen = ({
    navigation,
    route,
}: UserRegistrationScreenProps) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Box flex="1" m="4" p="2" safeAreaTop>
                    <BaseScreen />
                    <View>
                        <Heading>Welcome {route.params.accountType}</Heading>
                    </View>
                    <View mt={5}>
                        <Center>
                            <Text fontSize={'md'}>
                                {route.params.schoolInfo.name}
                            </Text>
                            <Text italic>
                                {route.params.schoolInfo.address.street}
                            </Text>
                            <Text italic>
                                {route.params.schoolInfo.address.city},
                                {route.params.schoolInfo.address.state}
                            </Text>
                        </Center>
                    </View>
                    <ScrollView>
                        <View mt="4">
                            <UserRegistrationForm
                                navigation={navigation}
                                route={route}
                            />
                        </View>
                    </ScrollView>
                </Box>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
