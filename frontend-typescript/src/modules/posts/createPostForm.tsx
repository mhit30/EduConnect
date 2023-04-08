import React, { useState, useContext } from 'react'
import { VStack, Text, IconButton, Center } from 'native-base'
import { axiosClient } from '../../utils/axiosClient'
import * as ImagePicker from 'expo-image-picker'
import { CustomButton } from '../../components/CustomButton'
import { getRandomAlphaNumeric } from '../../utils/randomValue'
import { CustomInput } from '../../components/CustomInput'
import { Feather } from '@expo/vector-icons'
import { Image } from 'expo-image'
interface IPostImage {
    name: any
    uri: any
    type: any
}

interface ICreatePostForm {
    setShowModal: any
}

export const CreatePostForm: React.FC<ICreatePostForm> = ({ setShowModal }) => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [postImage, setPostImage] = useState<IPostImage | null>(null)

    const pickPostImage = async (): Promise<void> => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.canceled) {
            setPostImage({
                name: getRandomAlphaNumeric(16),
                uri: result.assets[0].uri,
                type: result.assets[0].type,
            })
        }
    }

    const handleSubmit = async (): Promise<void> => {
        setIsLoading(true)
        let formData = new FormData()
        formData.append('post-image', {
            name: postImage?.name,
            uri: postImage?.uri,
            type: postImage?.type,
        })

        formData.append('title', title)
        formData.append('description', description)

        await axiosClient
            .post('v1/posts/createPost', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
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
                inputLabel="Post title"
                placeholder="Enter post title"
                onChangeText={(newTitleText: string) => setTitle(newTitleText)}
                enterKeyHint="next"
                inputMode="text"
            />
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Post description"
                placeholder="Enter post description"
                onChangeText={(newDescriptionText: string) =>
                    setDescription(newDescriptionText)
                }
                enterKeyHint="next"
                inputMode="text"
            />

            <IconButton
                onPress={pickPostImage}
                size="lg"
                variant="ghost"
                colorScheme="custom_primary"
                _icon={{
                    as: Feather,
                    name: 'image',
                }}
            />
            <Center>
                {postImage ? (
                    <Image
                        source={postImage.uri}
                        style={{ width: 200, height: 200 }}
                    />
                ) : null}
            </Center>

            <CustomButton
                label="Create new post"
                onPress={handleSubmit}
                isLoading={isLoading}
                spinnerPlacement="start"
                isLoadingText="Submitting"
            />
        </VStack>
    )
}
