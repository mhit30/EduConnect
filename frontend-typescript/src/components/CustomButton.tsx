import React from 'react'
import { Button } from 'native-base'
export const CustomButton: React.FC<any> = (props) => {
    return (
        <Button {...props} borderWidth={2} colorScheme="custom_secondary">
            {props.label}
        </Button>
    )
}
