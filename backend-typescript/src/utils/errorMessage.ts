// Code from https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
// Author: Julie Cherner

export const getErrorMessage = (error: Error) => {
    if (error instanceof Error) return error.message
    return String(error)
}
