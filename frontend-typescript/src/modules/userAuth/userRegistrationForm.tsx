import React, { useContext, useState } from 'react'
import { VStack, Text } from 'native-base'
import { CustomInput } from '../../components/CustomInput'
import { CustomButton } from '../../components/CustomButton'
import { UserRegistrationScreenProps } from '../../routes/stacks/authStack'
import { axiosClient } from '../../utils/axiosClient'
import { storeUserJWTToken } from '../../utils/asyncStorage'
import { UserAuthContext } from '../../hooks/contexts/UserAuthProvider'
import { UserAuthContextType } from '../../types/UserAuthTypes'

export const UserRegistrationForm: React.FC<UserRegistrationScreenProps> = ({
    route,
}) => {
    const { userAuthRegister } = useContext(
        UserAuthContext
    ) as UserAuthContextType
    const [error, setError] = useState<string | null>(null)
    const [grade, setGrade] = useState<number | null>(null)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async (): Promise<void> => {
        await axiosClient
            .post('/v1/auth/register', {
                accountType: route.params.accountType,
                grade: grade,
                fullName: {
                    firstName: firstName,
                    lastName: lastName,
                },
                email: email,
                password: password,
                joinCode: route.params.schoolJoinCode,
            })
            .then((res) => {
                const {
                    accountType,
                    grade,
                    fullName,
                    username,
                    email,
                    avatarUrl,
                    associatedUsers,
                    minSchoolInfo,
                    jwtToken,
                } = res.data
                storeUserJWTToken(jwtToken)
                userAuthRegister({
                    accountType: accountType,
                    grade: grade,
                    fullName: {
                        firstName: fullName.firstName,
                        lastName: fullName.lastName,
                    },
                    username: username,
                    email: email,
                    avatarUrl: avatarUrl,
                    associatedUsers: associatedUsers,
                    minSchoolInfo: {
                        name: minSchoolInfo.name,
                        address: {
                            city: minSchoolInfo.city,
                            state: minSchoolInfo.state,
                        },
                    },
                })
            })
            .catch((error) => {
                setError(error.message)
            })
    }
    return (
        <VStack space={2}>
            {error ? <Text>{error}</Text> : null}
            {route.params.accountType == 'student' ? (
                <CustomInput
                    type="text"
                    size="lg"
                    inputLabel="Grade level"
                    placeholder="Enter grade level"
                    onChangeText={(newGradeNumber: number) =>
                        setGrade(newGradeNumber)
                    }
                    enterKeyHint="next"
                    inputMode="numeric"
                />
            ) : null}

            <CustomInput
                type="text"
                size="lg"
                inputLabel="First name"
                placeholder="Enter first name"
                onChangeText={(newFirstNameText: string) =>
                    setFirstName(newFirstNameText)
                }
                autoComplete="given-name"
                enterKeyHint="next"
                inputMode="text"
            />
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Last name"
                placeholder="Enter last name"
                onChangeText={(newLastNameText: string) =>
                    setLastName(newLastNameText)
                }
                autoComplete="family-name"
                enterKeyHint="next"
                inputMode="text"
            />
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Email"
                placeholder="Enter email"
                onChangeText={(newEmailText: string) => setEmail(newEmailText)}
                autoComplete="email"
                enterKeyHint="next"
                inputMode="email"
            />
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Password"
                placeholder="Enter password"
                onChangeText={(newPasswordText: string) =>
                    setPassword(newPasswordText)
                }
                enterKeyHint="send"
                inputMode="text"
                secureTextEntry={true}
            />
            <CustomButton mt={4} label="Sign up" onPress={handleSubmit} />
        </VStack>
    )
}
