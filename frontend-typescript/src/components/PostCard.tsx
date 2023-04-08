import React from 'react'
import {
    View,
    Box,
    Center,
    Text,
    AspectRatio,
    Stack,
    Heading,
    Flex,
} from 'native-base'
import { Image } from 'expo-image'
import { PostEngagementMetrics } from './PostEngagementMetrics'
import { PostEngagementMetricsProvider } from '../hooks/contexts/PostEngagementMetricsProvider'
interface IPostCard {
    title: string
    description: string
    imageUrl?: string
    creator: {
        username: string
        fullName: {
            firstName: string
            lastName: string
        }
        avatarUrl: string
    }
    formattedDate: string
    postId: string
}

// Code adapted from Native Base Card example
// https://docs.nativebase.io/building-card
export const PostCard: React.FC<IPostCard> = ({
    title,
    description,
    imageUrl,
    creator,
    formattedDate,
    postId,
}) => {
    return (
        <View mt={2}>
            <Center>
                <Box
                    maxW="80"
                    rounded="lg"
                    overflow="hidden"
                    borderColor="custom_grayDark.200"
                    borderWidth="1"
                    backgroundColor="custom_grayDark.100"
                >
                    {imageUrl ? (
                        <Box>
                            <AspectRatio w="100%" ratio={16 / 9}>
                                <Image source={imageUrl} />
                            </AspectRatio>
                        </Box>
                    ) : null}
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                                {title}
                            </Heading>
                        </Stack>
                        <Text fontWeight="400">{description}</Text>
                        <PostEngagementMetricsProvider>
                            <PostEngagementMetrics postId={postId} />
                        </PostEngagementMetricsProvider>
                        <Flex direction={'row'} justifyContent="space-between">
                            <Text color="custom_darkGray.300" fontWeight="400">
                                {creator.fullName.firstName}
                                {creator.fullName.lastName} @{creator.username}
                            </Text>
                            <Text color="custom_darkGray.300" fontWeight="400">
                                {formattedDate}
                            </Text>
                        </Flex>
                    </Stack>
                </Box>
            </Center>
        </View>
    )
}
