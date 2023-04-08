import React from 'react'
import { FormControl, Input, Text } from 'native-base'

export const CustomInput: React.FC<any> = (props) => {
    return (
        <FormControl>
            <FormControl.Label>
                <Text bold>{props.inputLabel}</Text>
            </FormControl.Label>
            <Input {...props} borderWidth={2} />

            {props.inputError ? (
                <Text color="danger.500">{props.inputError}</Text>
            ) : null}
        </FormControl>
    )
}
