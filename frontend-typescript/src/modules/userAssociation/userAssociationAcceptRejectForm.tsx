import React, { useContext } from 'react'
import { IconButton, HStack } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { axiosClient } from '../../utils/axiosClient'
import { UserAssociationRequestsContext } from '../../hooks/contexts/UserAssociationRequestsProvider'
import { UserAssociationRequestsContextType } from '../../types/UserAssociationRequestTypes'

interface IUserAssociationAcceptRejectForm {
    associationRequestId: string
}
export const UserAssociationAcceptRejectForm: React.FC<
    IUserAssociationAcceptRejectForm
> = ({ associationRequestId }) => {
    const { getUserAssociationRequests } = useContext(
        UserAssociationRequestsContext
    ) as UserAssociationRequestsContextType
    const handleSubmit = async (associationStatus: 'accept' | 'reject') => {
        await axiosClient
            .put('/v1/userAssociation/actionOnAssociationRequest', {
                associationRequestId: associationRequestId,
                status: associationStatus,
            })
            .then((res) => {
                getUserAssociationRequests()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <HStack space={2}>
            <IconButton
                size="md"
                variant="ghost"
                colorScheme="success"
                _icon={{ as: Feather, name: 'check' }}
                onPress={() => handleSubmit('accept')}
            />
            <IconButton
                size="md"
                variant="ghost"
                colorScheme="danger"
                _icon={{ as: Feather, name: 'x' }}
                onPress={() => handleSubmit('reject')}
            />
        </HStack>
    )
}
