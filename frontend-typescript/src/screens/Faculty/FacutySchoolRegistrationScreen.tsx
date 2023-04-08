import React from 'react'
import { Heading, Box, View, Center } from 'native-base'
import {
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native'

import BaseScreen from '../BaseScreen'
import SignUpStudentSVG from '../../customAssets/signup/SignUpStudentSVG'
import { SchoolRegistrationForm } from '../../modules/faculty/schoolRegistrationForm'
// Forms

export const FacultySchoolRegistrationScreen = ({ navigation, route }: any) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Box flex="1" m="4" p="2" safeAreaTop>
                    <BaseScreen />
                    <View>
                        <Heading>Register Your School</Heading>
                    </View>
                    <View mt="16">
                        <SchoolRegistrationForm />
                    </View>
                </Box>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
