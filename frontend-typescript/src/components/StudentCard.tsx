import React, { useState } from 'react'
import { Box, Center, Text, Modal } from 'native-base'
import { CustomAvatar } from './CustomAvatar'
import { CreateParentMessageForm } from '../modules/myStudents/createParentMessageForm'
import { CustomButton } from './CustomButton'
interface IStudentCard {
    associatedUserFullName: {
        firstName: string
        lastName: string
    }
    associatedUserUsername: string
    associatedUserGrade: number
    associatedUserAvatarUrl: string
    associatedUserId: string
}

export const StudentCard: React.FC<any> = ({
    associatedUserFullName,
    associatedUserUsername,
    associatedUserGrade,
    associatedUserAvatarUrl,
    associatedUserId,
}: IStudentCard) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    const renderParentMessageModal = () => {
        return (
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                size="xl"
                avoidKeyboard
            >
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Notify school</Modal.Header>
                    <Modal.Body>
                        <CreateParentMessageForm
                            setShowModal={setShowModal}
                            studentId={associatedUserId}
                        />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        )
    }

    return (
        <Box
            bg="custom_secondary.300"
            borderRadius={6}
            borderColor="custom_secondary.500"
        >
            <Center height={300}>
                <CustomAvatar avatarUrl={associatedUserAvatarUrl} />
                <Box>
                    <Center>
                        <Text fontSize={'xl'}>
                            {`${associatedUserFullName.firstName} ${associatedUserFullName.lastName}`}
                        </Text>
                        <Text color="custom_primary.500">
                            @{associatedUserUsername}
                        </Text>
                        <Text fontSize="lg">Grade {associatedUserGrade}</Text>
                        <CustomButton
                            label="Notify School"
                            onPress={() => setShowModal(true)}
                        />
                    </Center>
                </Box>
            </Center>
            {renderParentMessageModal()}
        </Box>
    )
}
