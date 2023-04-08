import React from 'react'
import { View } from 'native-base'
import { Image } from 'expo-image'

export interface ICommentAvatar {
    avatarUrl: string
}

export const CustomCommentAvatar: React.FC<ICommentAvatar> = ({
    avatarUrl,
}) => {
    return (
        <View
            borderWidth="4"
            borderRadius="6"
            borderColor="custom_secondary.500"
        >
            <Image source={avatarUrl} style={{ width: 50, height: 50 }} />
        </View>
    )
}
