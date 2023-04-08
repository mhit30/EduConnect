import React from 'react'
import { Heading, Box, View, Text } from 'native-base'
import {
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableOpacity,
} from 'react-native'

import BaseScreen from '../BaseScreen'
import { UserLoginForm } from '../../modules/userAuth/userLoginForm'
import { UserLoginScreenProps } from '../../routes/stacks/authStack'
// Forms

export const UserLoginScreen = ({ navigation }: UserLoginScreenProps) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Box flex="1" m="4" p="2" safeAreaTop>
                    <BaseScreen />
                    <View>
                        <Heading>Welcome back!</Heading>
                    </View>
                    <View mt="16">
                        <UserLoginForm />
                    </View>
                    <View mt="4">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Landing')}
                        >
                            <Text fontSize="sm">No Account? Sign up!</Text>
                        </TouchableOpacity>
                    </View>
                </Box>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
