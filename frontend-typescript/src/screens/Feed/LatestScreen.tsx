import React, { useContext, useEffect, useState } from 'react'
import {
    Box,
    Heading,
    ScrollView,
    VStack,
    Modal,
    IconButton,
    Flex,
    Text,
} from 'native-base'
import BaseScreen from '../BaseScreen'
import { LatestScreenProps } from '../../routes/stacks/feedStack'
import { PostsContext } from '../../hooks/contexts/PostsProvider'
import { IIsolatedPost, PostContextType } from '../../types/PostTypes'
import { IsLoadingSplash } from '../../components/others/isLoadingSplash'
import { PostCard } from '../../components/PostCard'
import { Feather } from '@expo/vector-icons'

import { CreatePostForm } from '../../modules/posts/createPostForm'
import { TouchableOpacity } from 'react-native'
export const LatestScreen = ({ route, navigation }: LatestScreenProps) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const { posts, getPosts } = useContext(PostsContext) as PostContextType

    useEffect(() => {
        getPosts()
    }, [showModal])
    if (!posts) {
        return
    }
    // if (Object.keys(posts).length == 0) {
    //     return <IsLoadingSplash messages="Fetching posts..." />
    // }
    // handle obj
    const keysArr = Object.keys(posts)
    const elementsArr = keysArr.map((key: any) => posts[key])

    const renderStudentTeacherAddPostIcon = () => {
        if (
            route.params.accountType === 'student' ||
            route.params.accountType === 'teacher'
        ) {
            return (
                <IconButton
                    onPress={() => setShowModal(true)}
                    size="lg"
                    variant="ghost"
                    colorScheme="custom_primary"
                    _icon={{
                        as: Feather,
                        name: 'plus-square',
                    }}
                />
            )
        }
    }
    const renderStudentTeacherModal = () => {
        if (
            route.params.accountType === 'student' ||
            route.params.accountType === 'teacher'
        ) {
            return (
                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    size="xl"
                    avoidKeyboard
                >
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Header>Create a post</Modal.Header>
                        <Modal.Body>
                            <CreatePostForm setShowModal={setShowModal} />
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            )
        }
    }

    const handleNavigation = ({
        key,
        title,
        description,
        imageUrl,
        creator,
        formattedDate,
        postId,
    }: IIsolatedPost) => {
        navigation.navigate('IsolatedPost', {
            key: key,
            title: title,
            description: description,
            imageUrl: imageUrl,
            creator: creator,
            formattedDate: formattedDate,
            postId: postId,
        })
    }
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <BaseScreen />
            <Flex direction={'row'} justifyContent="space-between">
                <Heading>Latest</Heading>
                {renderStudentTeacherAddPostIcon()}
            </Flex>

            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack space={2}>
                    {elementsArr ? (
                        elementsArr.map((index, key) => {
                            return (
                                <TouchableOpacity
                                    key={key}
                                    onPress={() =>
                                        handleNavigation({
                                            key: key,
                                            title: index.title,
                                            description: index.description,
                                            imageUrl: index.imageUrl,
                                            creator: index.creator,
                                            formattedDate: index.formattedDate,
                                            postId: index.postId,
                                        })
                                    }
                                >
                                    <PostCard
                                        title={index.title}
                                        description={index.description}
                                        imageUrl={index.imageUrl}
                                        creator={index.creator}
                                        formattedDate={index.formattedDate}
                                        postId={index.postId}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    ) : (
                        <Text>No posts.</Text>
                    )}
                </VStack>
            </ScrollView>
            {renderStudentTeacherModal()}
        </Box>
    )
}
