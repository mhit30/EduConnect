import React, { useState } from 'react'
import { VStack, Text } from 'native-base'
import { axiosClient } from '../../utils/axiosClient'
import { CustomInput } from '../../components/CustomInput'
import { CustomButton } from '../../components/CustomButton'

export const UserAssociationRequestForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [recipientUsername, setRecipientUsername] = useState<string>('')
    const handleSubmit = async (): Promise<void> => {
        await axiosClient
            .post('/v1/userAssociation/requestAssociation', {
                recipientUsername: recipientUsername,
            })
            .then((res) => {
                console.log(res.data)
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
                inputLabel="Student's username"
                placeholder="Enter student's username"
                onChangeText={(newRecipientUsernameText: string) =>
                    setRecipientUsername(newRecipientUsernameText)
                }
                autoComplete="username"
                enterKeyHint="next"
                inputMode="text"
            />

            <CustomButton mt={4} label="Request" onPress={handleSubmit} />
        </VStack>
    )
}
