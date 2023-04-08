import crypto from 'crypto'

const allowedCharacters: string =
    'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789' // omitting capital i (I) and lower case L (l) because they look too similar to other characters

export const getRandomAlphaNumeric = (requestedLength: number): string => {
    let generatedAlphaNumeric = ''
    for (let i = 0; i < requestedLength; i++) {
        generatedAlphaNumeric += allowedCharacters.charAt(
            Math.floor(Math.random() * allowedCharacters.length),
        ) // pick a random character requestedLength times
    }
    return generatedAlphaNumeric
}

export const getUUID = (): string => {
    return crypto.randomUUID()
}
