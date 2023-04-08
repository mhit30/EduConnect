import React, { useContext, useEffect } from 'react'
import { VStack, ScrollView, Text, HStack } from 'native-base'
import { PostCommentsContextType } from '../../types/PostCommentsTypes'
import { PostCommentsContext } from '../../hooks/contexts/PostCommentsProvider'
import { CustomCommentAvatar } from '../CustomCommentAvatar'

interface IPostComments {
    postId: string
}
export const PostComments: React.FC<IPostComments> = ({ postId }): any => {
    const { postComments, getPostComments } = useContext(
        PostCommentsContext
    ) as PostCommentsContextType

    // whenever postComments changes, re-render
    useEffect(() => {
        getPostComments(postId)
    }, [postComments])

    if (!postComments) {
        return
    }
    if (Object.keys(postComments).length == 0) {
        return <Text>No comments</Text>
    }
    // handle obj
    const keysArr = Object.keys(postComments)
    const elementsArr = keysArr.map((key: any) => postComments[key])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {elementsArr.map((index, key) => {
                return (
                    <HStack key={key} mt={2} space={2}>
                        <CustomCommentAvatar
                            avatarUrl={index.commentCreator.avatarUrl}
                        />
                        <VStack>
                            <Text>{index.commentBody}</Text>
                            <Text color="custom_darkGray.300" fontWeight="400">
                                @{index.commentCreator.username}
                            </Text>
                            <Text color="custom_darkGray.300" fontWeight="400">
                                {index.formattedDate}
                            </Text>
                        </VStack>
                    </HStack>
                )
            })}
        </ScrollView>
    )
}
