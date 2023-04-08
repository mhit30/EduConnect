import 'react-native-gesture-handler'
import { NativeBaseProvider, extendTheme } from 'native-base'
import { useFonts } from 'expo-font'

// Navigation
import { Index } from './src'
import { UserAuthProvider } from './src/hooks/contexts/UserAuthProvider'
import { UserAssociationRequestsProvider } from './src/hooks/contexts/UserAssociationRequestsProvider'

const App: React.FC = () => {
    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Italic': require('./assets/fonts/Poppins/Poppins-Italic.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
        'Poppins-MediumItalic': require('./assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
        'Poppins-Semibold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
        'Poppins-SemiboldItalic': require('./assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-BoldItalic': require('./assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
        'Poppins-ExtraBold': require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraBoldItalic': require('./assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf'),
        'Poppins-Black': require('./assets/fonts/Poppins/Poppins-Black.ttf'),
        'Poppins-BlackItalic': require('./assets/fonts/Poppins/Poppins-BlackItalic.ttf'),
        'Lato-Light': require('./assets/fonts/Lato/Lato-Light.ttf'),
        'Lato-LightItalic': require('./assets/fonts/Lato/Lato-LightItalic.ttf'),
        'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
        'Lato-Italic': require('./assets/fonts/Lato/Lato-Italic.ttf'),
        'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
        'Lato-BoldItalic': require('./assets/fonts/Lato/Lato-BoldItalic.ttf'),
        'Lato-Black': require('./assets/fonts/Lato/Lato-Black.ttf'),
        'Lato-BlackItalic': require('./assets/fonts/Lato/Lato-BlackItalic.ttf'),
    })
    // Theme

    const customTheme = {
        fontConfig: {
            Poppins: {
                400: {
                    normal: 'Poppins-Regular',
                    italic: 'Poppins-Italic',
                },
                500: {
                    normal: 'Poppins-Medium',
                    italic: 'Poppins-MediumItalic',
                },
                600: {
                    normal: 'Poppins-Semibold',
                    italic: 'Poppins-SemiboldItalic',
                },
                700: {
                    normal: 'Poppins-Bold',
                    italic: 'Poppins-BoldItalic',
                },
                800: {
                    normal: 'Poppins-ExtraBold',
                    italic: 'Poppins-ExtraBoldItalic',
                },
                900: {
                    normal: 'Poppins-Black',
                    italic: 'Poppins-BlackItalic',
                },
            },
            Lato: {
                300: {
                    normal: 'Lato-Light',
                    italic: 'Lato-Italic',
                },
                400: {
                    normal: 'Lato-Regular',
                    italic: 'Lato-Italic',
                },
                700: {
                    normal: 'Lato-Bold',
                    italic: 'Lato-BoldItalic',
                },
                900: {
                    normal: 'Lato-Black',
                    italic: 'Lato-BlackItalic',
                },
            },
        },
        fonts: {
            heading: 'Poppins',
            body: 'Lato',
            mono: 'Lato',
        },
        // 500 is the default color for each color
        custom_primary: {
            DEFAULT: '#6D466B',
            50: '#C5A5C4',
            100: '#BD99BC',
            200: '#AD80AB',
            300: '#9D679B',
            400: '#865683',
            500: '#6D466B',
            600: '#4B3049',
            700: '#291A28',
            800: '#070406',
            900: '#000000',
        },
        custom_secondary: {
            DEFAULT: '#B49FCC',
            50: '#FFFFFF',
            100: '#FFFFFF',
            200: '#F2EFF6',
            300: '#DED4E8',
            400: '#C9BADA',
            500: '#B49FCC',
            600: '#977AB9',
            700: '#7B57A4',
            800: '#5F447F',
            900: '#44305B',
        },
        custom_darkPurple: {
            DEFAULT: '#412234',
            50: '#B16A93',
            100: '#AA5C89',
            200: '#914C74',
            300: '#773E5F',
            400: '#5C3049',
            500: '#412234',
            600: '#1C0F17',
            700: '#000000',
            800: '#000000',
            900: '#000000',
        },
        custom_muted: {
            DEFAULT: '#EAD7D7',
            50: '#FFFFFF',
            100: '#FFFFFF',
            200: '#FFFFFF',
            300: '#FFFFFF',
            400: '#F8F2F2',
            500: '#EAD7D7',
            600: '#D7B2B2',
            700: '#C38D8D',
            800: '#B06969',
            900: '#934D4D',
        },
        custom_darkGray: {
            DEFAULT: '#43515C',
            50: '#9EADB8',
            100: '#92A3B0',
            200: '#7B8F9F',
            300: '#657B8B',
            400: '#546674',
            500: '#43515C',
            600: '#2B343C',
            700: '#14181B',
            800: '#000000',
            900: '#000000',
        },
        custom_white: {
            DEFAULT: '#FFFFFF',
            50: '#FFFFFF',
            100: '#FFFFFF',
            200: '#FFFFFF',
            300: '#FFFFFF',
            400: '#FFFFFF',
            500: '#FFFFFF',
            600: '#E3E3E3',
            700: '#C7C7C7',
            800: '#ABABAB',
            900: '#8F8F8F',
        },
    }

    const theme = extendTheme({
        colors: customTheme,
        fontConfig: customTheme.fontConfig,
        fonts: customTheme.fonts,
        components: {
            Heading: {
                baseStyle: {
                    heading: 'Poppins',
                    fontWeight: '700',
                    color: customTheme.custom_darkGray[500],
                },
            },
            Text: {
                baseStyle: {
                    heading: 'Lato',
                    fontWeight: '700',
                    color: customTheme.custom_primary[600],
                },
            },
            Input: {
                baseStyle: {
                    backgroundColor: customTheme.custom_white[500],
                    borderRadius: 8,
                    height: 12,
                    borderColor: customTheme.custom_secondary[300],
                    _focus: {
                        borderColor: customTheme.custom_secondary[600],
                    },
                },
            },
            Button: {
                baseStyle: {
                    borderColor: customTheme.custom_secondary[500],
                    borderRadius: 12,
                    height: 12,
                },
            },
        },
    })

    if (!fontsLoaded) {
        return null
    }
    return (
        <NativeBaseProvider theme={theme}>
            <UserAuthProvider>
                <Index />
            </UserAuthProvider>
        </NativeBaseProvider>
    )
}

export default App
