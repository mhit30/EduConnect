import React, { useState, useContext } from 'react'
import { VStack, Text, View } from 'native-base'
import { axiosClient } from '../../utils/axiosClient'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity } from 'react-native'
import { CustomButton } from '../../components/CustomButton'
import { getRandomAlphaNumeric } from '../../utils/randomValue'
import { UserAuthContext } from '../../hooks/contexts/UserAuthProvider'
import { UserAuthContextType } from '../../types/UserAuthTypes'
import { CustomAvatar } from '../../components/CustomAvatar'

interface IAvatar {
    name: any
    uri: any
    type: any
}
export const AccountEditForm: React.FC = () => {
    const { getUserInfo } = useContext(UserAuthContext) as UserAuthContextType
    const [error, setError] = useState<string | null>(null)
    const [avatar, setAvatar] = useState<IAvatar | null>(null)

    const pickAvatar = async (): Promise<void> => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.canceled) {
            setAvatar({
                name: getRandomAlphaNumeric(16),
                uri: result.assets[0].uri,
                type: result.assets[0].type,
            })
        }
    }

    const handleSubmit = async (): Promise<void> => {
        let formData = new FormData()
        formData.append('avatar', {
            name: avatar?.name,
            uri: avatar?.uri,
            type: avatar?.type,
        })

        await axiosClient
            .post('/v1/user/updateUserInfo', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
                getUserInfo()
                setAvatar(null) // the avatar rendered components will disappear
            })
            .catch((error) => {
                setError(error.message)
            })
    }
    return (
        <VStack space={2}>
            {error ? <Text color="danger.500">{error}</Text> : null}
            <TouchableOpacity onPress={pickAvatar}>
                <Text mt={2}>Edit avatar</Text>
            </TouchableOpacity>
            {avatar ? (
                <View>
                    <Text fontSize={'sm'}>Preview</Text>
                    <CustomAvatar avatarUrl={avatar.uri} />
                    <CustomButton
                        mt={2}
                        onPress={handleSubmit}
                        label="Update"
                    />
                </View>
            ) : null}
        </VStack>
    )
}
