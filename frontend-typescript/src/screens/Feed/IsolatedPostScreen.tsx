import React, { useState } from 'react'
import {
    Box,
    Heading,
    VStack,
    View,
    Text,
    Flex,
    Modal,
    AspectRatio,
    IconButton,
} from 'native-base'
import BaseScreen from '../BaseScreen'
import { IsolatedPostScreenProps } from '../../routes/stacks/feedStack'
import { Image } from 'expo-image'
import { PostEngagementMetrics } from '../../components/PostEngagementMetrics'
import { Feather } from '@expo/vector-icons'
import { PostComments } from '../../components/childComponents/PostComments'
import { PostCommentsProvider } from '../../hooks/contexts/PostCommentsProvider'
import { CreatePostCommentForm } from '../../modules/posts/createPostCommentForm'
import { PostEngagementMetricsProvider } from '../../hooks/contexts/PostEngagementMetricsProvider'

export const IsolatedPostScreen = ({
    route,
    navigation,
}: IsolatedPostScreenProps) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    const {
        key,
        title,
        description,
        imageUrl,
        creator,
        formattedDate,
        postId,
    } = route.params

    const renderPostCommentModal = () => {
        return (
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                size="xl"
                avoidKeyboard
            >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Create a comment</Modal.Header>
                    <Modal.Body>
                        <CreatePostCommentForm
                            setShowModal={setShowModal}
                            postId={postId}
                        />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        )
    }
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <BaseScreen />
            <Flex direction={'row'} justifyContent="space-between">
                <IconButton
                    onPress={() => navigation.goBack()}
                    size="lg"
                    variant="ghost"
                    colorScheme="custom_primary"
                    _icon={{
                        as: Feather,
                        name: 'arrow-left',
                    }}
                />
            </Flex>

            <VStack space={2}>
                <View>
                    <Heading size="md">{title}</Heading>
                </View>
                {imageUrl ? (
                    <Box>
                        <AspectRatio w="100%" ratio={4 / 3}>
                            <Image source={imageUrl} />
                        </AspectRatio>
                    </Box>
                ) : null}

                <Flex direction={'row'} justifyContent="space-between">
                    <Text color="custom_darkGray.300" fontWeight="400">
                        {creator.fullName.firstName}
                        {creator.fullName.lastName} @{creator.username}
                    </Text>
                    <Text color="custom_darkGray.300" fontWeight="400">
                        {formattedDate}
                    </Text>
                </Flex>
                <View>
                    <Text fontWeight="medium">{description}</Text>
                    <PostEngagementMetricsProvider>
                        <PostEngagementMetrics
                            postId={postId}
                            setShowModal={setShowModal}
                        />
                    </PostEngagementMetricsProvider>
                </View>
            </VStack>
            <PostCommentsProvider>
                <PostComments postId={postId} />
            </PostCommentsProvider>

            {renderPostCommentModal()}
        </Box>
    )
}
