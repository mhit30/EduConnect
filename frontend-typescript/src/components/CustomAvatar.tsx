import React from 'react'
import { View } from 'native-base'
import { Image } from 'expo-image'

export interface IAvatar {
    avatarUrl: string
}

export const CustomAvatar: React.FC<IAvatar> = ({ avatarUrl }) => {
    return (
        <View
            borderWidth="4"
            borderRadius="6"
            borderColor="custom_secondary.500"
        >
            <Image source={avatarUrl} style={{ width: 100, height: 100 }} />
        </View>
    )
}
