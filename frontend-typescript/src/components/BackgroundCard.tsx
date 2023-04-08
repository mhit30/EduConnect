import React from 'react'
import { Box, Center, Heading, HStack, Pressable } from 'native-base'

type BackgroundCardProps = {
    userType: string
    svg: any
    onPress(): void
}
export const BackgroundCard: React.FC<BackgroundCardProps> = ({
    userType,
    svg,
    onPress,
}) => {
    return (
        <Pressable onPress={() => onPress()}>
            {({ isPressed }) => {
                return (
                    <Box
                        borderRadius="md"
                        bgColor={
                            isPressed
                                ? 'custom_secondary.600'
                                : 'custom_secondary.300'
                        }
                        h="120"
                        overflow="hidden"
                    >
                        <HStack justifyContent="center" space={10}>
                            <Box>{svg}</Box>
                            <Center mr="10">
                                <Heading>{userType}</Heading>
                            </Center>
                        </HStack>
                    </Box>
                )
            }}
        </Pressable>
    )
}
