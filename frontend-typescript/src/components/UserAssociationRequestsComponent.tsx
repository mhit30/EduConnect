import React, { useContext, useEffect } from 'react'
import { Button, ScrollView, Text, Heading, VStack, Flex } from 'native-base'
import { UserAssociationAcceptRejectForm } from '../modules/userAssociation/userAssociationAcceptRejectForm'
import { UserAssociationRequestsContext } from '../hooks/contexts/UserAssociationRequestsProvider'
import { UserAssociationRequestsContextType } from '../types/UserAssociationRequestTypes'

export const UserAssociationRequestsComponent: React.FC<any> = () => {
    const { userAssociationRequests, getUserAssociationRequests } = useContext(
        UserAssociationRequestsContext
    ) as UserAssociationRequestsContextType

    useEffect(() => {
        getUserAssociationRequests()
    }, [])
    if (!userAssociationRequests) {
        return
    }
    if (Object.keys(userAssociationRequests).length == 0) {
        return (
            <Text mt={12} ml={4}>
                No Requests!
            </Text>
        )
    }
    // handle obj
    const keysArr = Object.keys(userAssociationRequests)
    const elementsArr = keysArr.map((key: any) => userAssociationRequests[key])
    console.log(elementsArr)
    return (
        <VStack mt={4} space={4}>
            {elementsArr.map((index, key) => {
                return (
                    <Flex
                        key={key}
                        direction={'row'}
                        justifyContent="space-between"
                    >
                        <Text color="custom_darkGray.300">
                            @{index.userAssociationRequestUsername}
                        </Text>

                        <UserAssociationAcceptRejectForm
                            associationRequestId={
                                index.userAssociationRequestId
                            }
                        />
                    </Flex>
                )
            })}
        </VStack>
    )
}
