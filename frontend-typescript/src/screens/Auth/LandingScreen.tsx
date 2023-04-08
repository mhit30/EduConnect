import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Heading, Box, VStack, Text } from 'native-base'
import { BackgroundCard } from '../../components/BackgroundCard'

// SVGS
import LandingParentSVG from '../../customAssets/landing/LandingParentSVG'
import LandingStudentSVG from '../../customAssets/landing/LandingStudentSVG'
import LandingTeacherSVG from '../../customAssets/landing/LandingTeacherSVG'
import { LandingScreenProps } from '../../routes/stacks/authStack'
// Base
import BaseScreen from '../BaseScreen'

export const LandingScreen = ({ navigation }: LandingScreenProps) => {
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <BaseScreen />
            <View>
                <Heading>Select</Heading>
                <Heading>user type</Heading>
            </View>

            <View mt="16">
                <VStack space={2}>
                    <BackgroundCard
                        userType="Parent"
                        svg={<LandingParentSVG />}
                        onPress={() =>
                            navigation.navigate('UserRegistrationSchool', {
                                accountType: 'parent',
                            })
                        }
                    />
                    <BackgroundCard
                        userType="Student"
                        svg={<LandingStudentSVG />}
                        onPress={() =>
                            navigation.navigate('UserRegistrationSchool', {
                                accountType: 'student',
                            })
                        }
                    />
                    <BackgroundCard
                        userType="Teacher"
                        svg={<LandingTeacherSVG />}
                        onPress={() =>
                            navigation.navigate('UserRegistrationSchool', {
                                accountType: 'teacher',
                            })
                        }
                    />
                </VStack>
            </View>
            <View mt="4">
                <Text fontSize="sm">
                    By continuing, you are agreeing to the privacy policy and
                    terms and conditions.
                </Text>
            </View>
            <View mt="4">
                <TouchableOpacity
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                >
                    <Text fontSize="sm">Privacy Policy</Text>
                </TouchableOpacity>
            </View>
            <View mt="4">
                <TouchableOpacity
                    onPress={() => navigation.navigate('TermsOfService')}
                >
                    <Text fontSize="sm">Terms And Conditions</Text>
                </TouchableOpacity>
            </View>
            <View mt="4">
                <TouchableOpacity
                    onPress={() => navigation.navigate('UserLogin')}
                >
                    <Text fontSize="sm">Already have account? Sign in!</Text>
                </TouchableOpacity>
            </View>
        </Box>
    )
}
