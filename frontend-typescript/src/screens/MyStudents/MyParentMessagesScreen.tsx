import React, { useContext, useEffect } from 'react'
import { Text, Flex, View, Box, Heading, Badge, ScrollView } from 'native-base'
import { MyParentMessagesProps } from '../../routes/stacks/myStudentsStack'
import BaseScreen from '../BaseScreen'
import { ParentMessagesContext } from '../../hooks/contexts/ParentMessagesProvider'
import { ParentMessagesContextType } from '../../types/ParentMessagesContextTypes'

export const MyParentMessagesScreen = ({
    navigation,
    route,
}: MyParentMessagesProps) => {
    const { parentMessages, getParentMessages } = useContext(
        ParentMessagesContext
    ) as ParentMessagesContextType
    useEffect(() => {
        getParentMessages()
    }, [])
    if (!parentMessages) {
        return
    }
    if (Object.keys(parentMessages).length == 0) {
        return (
            <Text mt={12} ml={4}>
                No Requests!
            </Text>
        )
    }
    // handle obj
    const keysArr = Object.keys(parentMessages)
    const elementsArr = keysArr.map((key: any) => parentMessages[key])

    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <BaseScreen />
            <View>
                <Heading>Parent Messages</Heading>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {elementsArr
                    ? elementsArr.map((index, key) => {
                          return (
                              <Flex
                                  direction={'row'}
                                  justifyContent="space-between"
                              >
                                  <View>
                                      <Text fontSize={'xl'}>
                                          {index.studentFullName.firstName}{' '}
                                          {index.studentFullName.lastName}
                                      </Text>

                                      <Text>{index.title}</Text>
                                      <Text
                                          color="custom_darkGray.500"
                                          fontWeight="400"
                                      >
                                          {index.body}
                                      </Text>
                                  </View>

                                  {index.status === 'pending' ? (
                                      <Text fontSize="sm" color={'danger.500'}>
                                          Pending
                                      </Text>
                                  ) : index.status === 'resolved' ? (
                                      <Text fontSize="sm" color={'success.500'}>
                                          Resolved
                                      </Text>
                                  ) : null}
                              </Flex>
                          )
                      })
                    : null}
            </ScrollView>
        </Box>
    )
}
