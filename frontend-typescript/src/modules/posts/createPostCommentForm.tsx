import React, { useContext, useState } from 'react'
import { VStack, Text } from 'native-base'
import { axiosClient } from '../../utils/axiosClient'
import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { PostCommentsContext } from '../../hooks/contexts/PostCommentsProvider'
import { PostCommentsContextType } from '../../types/PostCommentsTypes'

interface ICreateCommentForm {
    postId: string
    setShowModal: any
}

export const CreatePostCommentForm: React.FC<ICreateCommentForm> = ({
    postId,
    setShowModal,
}) => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [commentBody, setCommentBody] = useState<string>('')

    const handleSubmit = async (): Promise<void> => {
        setIsLoading(true)
        await axiosClient
            .post('v1/posts/createPostComment', {
                commentBody: commentBody,
                postId: postId,
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
                inputLabel="Leave a comment"
                placeholder="Leave a fun comment"
                onChangeText={(newCommentBodyText: string) =>
                    setCommentBody(newCommentBodyText)
                }
                enterKeyHint="next"
                inputMode="text"
            />

            <CustomButton
                label="Create new post"
                onPress={handleSubmit}
                isLoading={isLoading}
                spinnerPlacement="start"
                isLoadingText="Leaving comment"
            />
        </VStack>
    )
}
