import React from 'react'
import { IconButton, Flex, Text } from 'native-base'
import Feather from '@expo/vector-icons/Feather'

interface ISharePostIconMetric {
    shares: number
    postId: string
}

export const SharePostIconMetric: React.FC<ISharePostIconMetric> = ({
    shares,
    postId,
}) => {
    return (
        <Flex direction="row" justifyContent="space-between">
            <Text mt={2}>{shares?.toString()}</Text>
            <IconButton
                colorScheme="custom_darkGray"
                size="md"
                _icon={{ as: Feather, name: 'share-2' }}
            />
        </Flex>
    )
}
