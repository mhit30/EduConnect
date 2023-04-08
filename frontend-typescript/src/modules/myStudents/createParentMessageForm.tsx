import React, { useContext, useState } from 'react'
import { VStack, Text } from 'native-base'
import { axiosClient } from '../../utils/axiosClient'
import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'

interface ICreateParentMessageForm {
    studentId: string
    setShowModal: any
}

export const CreateParentMessageForm: React.FC<ICreateParentMessageForm> = ({
    studentId,
    setShowModal,
}) => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [parentMessageTitle, setParentMessageTitle] = useState<string>('')
    const [parentMessageBody, setParentMessageBody] = useState<string>('')

    const handleSubmit = async (): Promise<void> => {
        setIsLoading(true)
        await axiosClient
            .post('v1/parentMessages/createParentMessage', {
                title: parentMessageTitle,
                body: parentMessageBody,
                studentId: studentId,
            })
            .then((res) => {
                setShowModal(false)
            })
            .catch((error) => {
                setError(error.message)
            })
        setIsLoading(false)
    }

    return (
        <VStack space={2}>
            {error ? <Text color="danger.500">{error}</Text> : null}

            <CustomInput
                type="text"
                size="lg"
                inputLabel="Title"
                placeholder="Set a title"
                onChangeText={(newParentMessageTitleText: string) =>
                    setParentMessageTitle(newParentMessageTitleText)
                }
                enterKeyHint="next"
                inputMode="text"
            />

            <CustomInput
                type="text"
                size="lg"
                inputLabel="Description"
                placeholder="Set a description"
                onChangeText={(newParentMessageBodyText: string) =>
                    setParentMessageBody(newParentMessageBodyText)
                }
                enterKeyHint="next"
                inputMode="text"
            />

            <CustomButton
                label="Send message"
                onPress={handleSubmit}
                isLoading={isLoading}
                spinnerPlacement="start"
                isLoadingText="Sending message"
            />
        </VStack>
    )
}
