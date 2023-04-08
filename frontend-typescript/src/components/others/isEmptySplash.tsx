import React from 'react'
import { Box, Center, Heading, HStack } from 'native-base'
import IsEmptySVG from '../../customAssets/others/isEmptySVG'

interface IIsEmptySplash {
    messages: string
}
export const IsEmptySplash: React.FC<IIsEmptySplash> = ({ messages }) => {
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <HStack space="2" justifyContent="center" mt="24">
                <Heading>{messages}</Heading>
            </HStack>

            <Center
                position="absolute"
                justifyContent="center"
                alignItems="center"
                top="0"
                right="0"
                left="40"
                bottom="-256"
            >
                <IsEmptySVG zIndex="-1" elevation="-1" />
            </Center>
        </Box>
    )
}
