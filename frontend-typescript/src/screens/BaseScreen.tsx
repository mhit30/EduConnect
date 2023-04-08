import React from 'react'
import { Box } from 'native-base'

import { StatusBar } from 'expo-status-bar'

const BaseScreen: React.FC = ({ children }: any) => {
    return <StatusBar style="dark" />
}

export default BaseScreen
