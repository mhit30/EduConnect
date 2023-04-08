import React, { useContext, useEffect } from 'react'
import { Text, Flex, View, Box, Heading, ScrollView } from 'native-base'
import { CalendarOverviewProps } from '../../routes/stacks/calendarStack'
import BaseScreen from '../BaseScreen'
import { EventsContext } from '../../hooks/contexts/EventsContextProvider'
import { EventsContextType } from '../../types/EventsContextTypes'
import { CustomButton } from '../../components/CustomButton'
import { axiosClient } from '../../utils/axiosClient'

export const CalendarOverviewScreen = ({
    navigation,
    route,
}: CalendarOverviewProps) => {
    const { events, getEventsInfo } = useContext(
        EventsContext
    ) as EventsContextType

    useEffect(() => {
        getEventsInfo()
    }, [])

    if (!events) {
        return
    }
    if (Object.keys(events).length == 0) {
        return (
            <Text mt={12} ml={4}>
                No Events
            </Text>
        )
    }
    // handle obj
    const keysArr = Object.keys(events)
    const elementsArr = keysArr.map((key: any) => events[key])

    const handleSubmit = async (eventId: string) => {
        await axiosClient.put('/v1/calendar/updateEventWithRSVP', {
            updateType: 'RSVP',
            eventId: eventId,
        })
    }
    return (
        <Box flex="1" m="4" p="2" safeAreaTop>
            <BaseScreen />
            <View>
                <Heading>Calendar</Heading>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {elementsArr.map((index, key) => {
                    return (
                        <View key={key} mt={4}>
                            <Flex
                                direction={'row'}
                                justifyContent="space-between"
                            >
                                <View>
                                    <Text fontSize={'lg'}>{index.name}</Text>
                                    <Text
                                        color="custom_darkGray.500"
                                        fontWeight="400"
                                    >
                                        {index.description}
                                    </Text>
                                </View>
                                <Text
                                    color="custom_darkGray.500"
                                    fontWeight="400"
                                >
                                    {index.eventDate.substring(0, 10)}
                                </Text>
                                {index.eventType === 'RSVP' ? (
                                    <CustomButton
                                        label="RSVP"
                                        onPress={() => handleSubmit(index._id)}
                                    />
                                ) : null}
                            </Flex>
                        </View>
                    )
                })}
            </ScrollView>
        </Box>
    )
}
