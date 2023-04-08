import React, { useState } from 'react'
import { IconButton, Flex, Text } from 'native-base'
import Feather from '@expo/vector-icons/Feather'
import { useRoute } from '@react-navigation/native'

interface ICommentPostIconMetric {
    comments: number
    postId: string
    setShowModal: any
}

export const CommentPostIconMetric: React.FC<ICommentPostIconMetric> = ({
    comments,
    postId,
    setShowModal,
}) => {
    // getting route name
    const route = useRoute()
    const routeName = route.name

    return (
        <Flex direction="row" justifyContent="space-between">
            <Text mt={2}>{comments?.toString()}</Text>
            <IconButton
                colorScheme="custom_darkGray"
                size="md"
                _icon={{ as: Feather, name: 'message-square' }}
                onPress={
                    routeName === 'IsolatedPost'
                        ? () => setShowModal(true)
                        : null
                }
            />
        </Flex>
    )
}
