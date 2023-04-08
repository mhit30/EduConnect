import React, { useState, useContext } from 'react'
import {
    Box,
    Modal,
    Heading,
    Flex,
    IconButton,
    ScrollView,
    Text,
    View,
    VStack,
} from 'native-base'
import BaseScreen from '../BaseScreen'
import { MyStudentsProp } from '../../routes/stacks/myStudentsStack'
import { StudentCard } from '../../components/StudentCard'
import { Feather } from '@expo/vector-icons'
import { UserAssociationRequestForm } from '../../modules/userAssociation/userAssociationRequestForm'
import { AssociatedUsersContext } from '../../hooks/contexts/AssociatedUsersProvider'
import { AssociatedUsersContextType } from '../../types/AssociatedUsersProviderTypes'
import { IsLoadingSplash } from '../../components/others/isLoadingSplash'

export const MyStudentsOverviewScreen = ({
    navigation,
    route,
}: MyStudentsProp) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const { associatedUsers } = useContext(
        AssociatedUsersContext
    ) as AssociatedUsersContextType
    // handle if null or empty
    if (!associatedUsers) {
        return
    }
    // if (Object.keys(associatedUsers).length == 0) {
    //     return <IsLoadingSplash messages="No association request." />
    // }

    // handle obj
    const keysArr = Object.keys(associatedUsers)
    const elementsArr = keysArr.map((key: any) => associatedUsers[key])
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <BaseScreen />
            <View>
                <Flex direction={'row'} justifyContent="space-between">
                    <Heading>My Students</Heading>
                    <IconButton
                        onPress={() => setShowModal(true)}
                        size="lg"
                        variant="ghost"
                        colorScheme="custom_primary"
                        _icon={{
                            as: Feather,
                            name: 'user-plus',
                        }}
                    />
                    <IconButton
                        onPress={() => navigation.navigate('MyParentMessages')}
                        size="lg"
                        variant="ghost"
                        colorScheme="custom_primary"
                        _icon={{
                            as: Feather,
                            name: 'inbox',
                        }}
                    />
                </Flex>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack mt={4} space={4}>
                    {elementsArr ? (
                        elementsArr.map((index, key) => {
                            return (
                                <StudentCard
                                    key={key}
                                    associatedUserFullName={
                                        index.associatedUserFullName
                                    }
                                    associatedUserUsername={
                                        index.associatedUserUsername
                                    }
                                    associatedUserGrade={
                                        index.associatedUserGrade
                                    }
                                    associatedUserAvatarUrl={
                                        index.associatedUserAvatarUrl
                                    }
                                    associatedUserId={index.associatedUserId}
                                />
                            )
                        })
                    ) : (
                        <Text>No association requests.</Text>
                    )}
                </VStack>
            </ScrollView>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                size="xl"
                avoidKeyboard
            >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Add Your Students</Modal.Header>
                    <Modal.Body>
                        <UserAssociationRequestForm />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    )
}
