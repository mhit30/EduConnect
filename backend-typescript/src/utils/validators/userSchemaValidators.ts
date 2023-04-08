export const validateEmail = (emailValue: string): boolean => {
    const emailRegex = new RegExp(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    )
    if (emailValue.match(emailRegex)) {
        return true
    }
    return false
}
