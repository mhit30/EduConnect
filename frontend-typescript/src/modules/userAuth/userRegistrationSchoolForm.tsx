import React, { useState } from 'react'
import { View } from 'native-base'
import { CustomInput } from '../../components/CustomInput'
import { CustomButton } from '../../components/CustomButton'
import { UserRegistrationSchoolScreenProps } from '../../routes/stacks/authStack'
import { axiosClient } from '../../utils/axiosClient'

export const UserRegistrationSchoolForm: React.FC<
    UserRegistrationSchoolScreenProps
> = ({ navigation, route }) => {
    const [error, setError] = useState<string | null>(null)
    const [schoolJoinCode, setSchoolJoinCode] = useState<string>('')
    const handleJoinCodeChange = (joinCode: string) =>
        setSchoolJoinCode(joinCode)

    const handleValidation = (): void => {
        if (schoolJoinCode.length == 7) {
            setError(null)
        } else {
            setError('Join code must be 7 characters long.')
        }
    }
    const handleSubmit = async (): Promise<void> => {
        await axiosClient
            .post('/v1/faculty/checkSchoolJoinCode', {
                schoolJoinCode: schoolJoinCode,
            })
            .then((res) => {
                navigation.navigate('UserRegistration', {
                    accountType: route.params.accountType,
                    schoolJoinCode: schoolJoinCode, // separate form schoolJoinCode to maintain backend interface order
                    schoolInfo: {
                        name: res.data.name,
                        address: {
                            street: res.data.address.street,
                            city: res.data.address.city,
                            zip: res.data.address.zip,
                            state: res.data.address.state,
                            country: res.data.address.country,
                        },
                    },
                })
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    return (
        <View>
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Join Code"
                placeholder="Enter school join code"
                autoCapitalize="characters"
                autoFocus={true}
                value={schoolJoinCode}
                onChangeText={handleJoinCodeChange}
                onBlur={handleValidation}
                inputError={error}
            />
            {error ? null : (
                <CustomButton mt={4} label="Continue" onPress={handleSubmit} />
            )}
        </View>
    )
}
