import React, { useState, useContext } from 'react'
import { VStack, Text } from 'native-base'
import { axiosClient } from '../../utils/axiosClient'
import { CustomInput } from '../../components/CustomInput'
import { CustomButton } from '../../components/CustomButton'
export const SchoolRegistrationForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [schoolName, setSchoolName] = useState<String>('')
    const [street, setStreet] = useState<String>('')
    const [city, setCity] = useState<String>('')
    const [state, setState] = useState<String>('')
    const [zip, setZip] = useState<String>('')
    const [country, setCountry] = useState<String>('')
    const handleSubmit = async (): Promise<void> => {
        await axiosClient
            .post('/v1/faculty/schoolRegistration', {
                name: schoolName,
                address: {
                    street: street,
                    city: city,
                    state: state,
                    zip: zip,
                    country: country,
                },
            })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <VStack space={2}>
            {error ? <Text color="danger.500">{error}</Text> : null}
            <CustomInput
                type="text"
                size="lg"
                inputLabel="School name"
                placeholder="Enter school name"
                onChangeText={(newSchoolNameText: string) =>
                    setSchoolName(newSchoolNameText)
                }
                enterKeyHint="next"
                inputMode="text"
            />
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Enter Street"
                placeholder="Enter street name"
                onChangeText={(newStreetText: string) =>
                    setStreet(newStreetText)
                }
                enterKeyHint="send"
                inputMode="text"
            />
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Enter City"
                placeholder="Enter city name"
                onChangeText={(newCity: string) => setCity(newCity)}
                enterKeyHint="send"
                inputMode="text"
            />
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Enter State"
                placeholder="Enter state name"
                onChangeText={(newStateText: string) => setState(newStateText)}
                enterKeyHint="send"
                inputMode="text"
            />
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Enter Zip Code"
                placeholder="Enter zip code"
                onChangeText={(newZipText: string) => setZip(newZipText)}
                enterKeyHint="send"
                inputMode="text"
            />
            <CustomInput
                type="text"
                size="lg"
                inputLabel="Enter country"
                placeholder="Enter country name"
                onChangeText={(newCountryText: string) =>
                    setCountry(newCountryText)
                }
                enterKeyHint="send"
                inputMode="text"
            />
            <CustomButton
                mt={4}
                label="Register School"
                onPress={handleSubmit}
            />
        </VStack>
    )
}
