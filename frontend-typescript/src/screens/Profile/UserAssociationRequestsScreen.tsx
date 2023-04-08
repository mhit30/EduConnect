import React, { useContext, useEffect, useState } from 'react'
import { View, Box, Heading, Flex, Text, VStack, ScrollView } from 'native-base'
import { RefreshControl } from 'react-native'
import BaseScreen from '../BaseScreen'
import {
    UserAssociationRequestsContext,
    UserAssociationRequestsProvider,
} from '../../hooks/contexts/UserAssociationRequestsProvider'
import { UserAssociationRequestsContextType } from '../../types/UserAssociationRequestTypes'
import { UserAssociationRequestsProps } from '../../routes/stacks/profileStack'
import { UserAssociationAcceptRejectForm } from '../../modules/userAssociation/userAssociationAcceptRejectForm'
import { UserAssociationRequestsComponent } from '../../components/UserAssociationRequestsComponent'

export const UserAssociationRequestsScreen = ({
    navigation,
    route,
}: UserAssociationRequestsProps) => {
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <BaseScreen />
            <ScrollView>
                <Heading>Association Requests</Heading>
                <UserAssociationRequestsProvider>
                    <UserAssociationRequestsComponent />
                </UserAssociationRequestsProvider>
            </ScrollView>
        </Box>
    )
}
