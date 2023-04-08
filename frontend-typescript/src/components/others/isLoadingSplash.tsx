import React from 'react'
import { Box, Center, Heading, Spinner, HStack } from 'native-base'
import IsLoadingSVG from '../../customAssets/others/IsLoadingSVG'

interface IIsLoadingSplash {
    messages: string
}
export const IsLoadingSplash: React.FC<IIsLoadingSplash> = ({ messages }) => {
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <HStack space="2" justifyContent="center" mt="24">
                <Spinner
                    accessibilityLabel="Loading"
                    color="custom_darkGray.500"
                />
                <Heading>{messages}</Heading>
            </HStack>

            <Center
                position="absolute"
                justifyContent="center"
                alignItems="center"
                top="0"
                right="0"
                left="0"
                bottom="-256"
            >
                <IsLoadingSVG zIndex="-1" elevation="-1" />
            </Center>
        </Box>
    )
}
