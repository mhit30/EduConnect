import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeUserJWTToken = async (userJWTToken: string) => {
    try {
        await AsyncStorage.setItem('userJWTToken', userJWTToken)
        await setPreviouslyAuthenticated('true')
    } catch (error) {
        console.log(error)
    }
}

export const getUserJWTToken = async () => {
    try {
        const userJWTToken = await AsyncStorage.getItem('userJWTToken')
        return userJWTToken !== null ? userJWTToken : null
    } catch (error) {
        console.log(error)
    }
}

// export const storeLocalUserInfo = async (user: IUser) => {
//     try {
//         const localUserInfoJSON = JSON.stringify(user)
//         await AsyncStorage.setItem('localUserInfo', localUserInfoJSON)
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const getLocalUserInfo = async () => {
//     try {
//         const localUserInfoJSON = await AsyncStorage.getItem('localUserInfo')
//         return localUserInfoJSON !== null ? JSON.parse(localUserInfoJSON) : null
//     } catch (error) {
//         console.log(error)
//     }
// }

export const setPreviouslyAuthenticated = async (authenticated: string) => {
    try {
        await AsyncStorage.setItem('isPreviouslyAuthenticated', authenticated) // "false" is value inside the storage
    } catch (error) {
        console.log(error)
    }
}

export const getPreviouslyAuthenticated = async (): Promise<
    boolean | undefined
> => {
    try {
        const isPreviouslyAuthenticated = await AsyncStorage.getItem(
            'isPreviouslyAuthenticated'
        )
        if (isPreviouslyAuthenticated == 'true') {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
