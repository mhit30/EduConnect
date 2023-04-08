import React, { useState } from 'react'
import { IconButton, Flex, Text } from 'native-base'
import Feather from '@expo/vector-icons/Feather'
import { axiosClient } from '../../utils/axiosClient'
interface ILikePostIconMetric {
    likes: number | undefined
    postId: string
}

export const LikePostIconMetric: React.FC<ILikePostIconMetric> = ({
    likes,
    postId,
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [amountOfLikes, setLikes] = useState<number | undefined>(likes)

    const handleLike = async (): Promise<void> => {
        setIsLiked(!isLiked)
        if (isLiked) {
            setLikes((prevLikeCount) => +prevLikeCount + 1)
        } else {
            if (amountOfLikes >= 1) {
                setLikes((prevLikeCount) => +prevLikeCount - 1)
            }
        }
        await axiosClient
            .put('v1/posts/updatePostLikes', {
                isLiked: isLiked,
                postId: postId,
            })
            .then((res) => {})
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <Flex direction="row" justifyContent="space-between">
            <Text mt={2}>{likes?.toString()}</Text>
            <IconButton
                colorScheme={isLiked ? 'custom_darkGray' : 'pink'}
                size="md"
                _icon={{ as: Feather, name: 'heart' }}
                _pressed={{ bg: 'pink.300' }}
                onPress={handleLike}
            />
        </Flex>
    )
}
