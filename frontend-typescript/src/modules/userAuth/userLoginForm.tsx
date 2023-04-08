import React, { useState, useContext } from 'react'
import { VStack, Text } from 'native-base'
import { axiosClient } from '../../utils/axiosClient'
import { storeUserJWTToken } from '../../utils/asyncStorage'
import { CustomInput } from '../../components/CustomInput'
import { CustomButton } from '../../components/CustomButton'
import { UserAuthContext } from '../../hooks/contexts/UserAuthProvider'
import { UserAuthContextType } from '../../types/UserAuthTypes'
export const UserLoginForm: React.FC = () => {
    const { userAuthLogin } = useContext(UserAuthContext) as UserAuthContextType
    const [error, setError] = useState<string | null>(null)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const handleSubmit = async (): Promise<void> => {
        await axiosClient
            .post('/v1/auth/login', {
                username: username,
                password: password,
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
                userAuthLogin({
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
                            city: minSchoolInfo.address.city,
                            state: minSchoolInfo.address.state,
                        },
                    },
                })
                axiosClient.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
            })
            .catch((error) => {
                setError(error.message)
            })
    }
    return (
        <VStack space={2}>
            {error ? <Text color="danger.500">{error}</Text> : null}
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Username"
                placeholder="Enter username"
                onChangeText={(newUsernameText: string) =>
                    setUsername(newUsernameText)
                }
                autoComplete="username"
                enterKeyHint="next"
                inputMode="text"
            />
            <Text fontSize="xs" italic>
                Your username is your email before @
            </Text>
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
            <CustomButton mt={4} label="Sign in" onPress={handleSubmit} />
        </VStack>
    )
}
