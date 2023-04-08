export const getRandomAvatar = (firstName: string): string => {
    const firstNameInitial = firstName.charAt(0)
    return `https://api.dicebear.com/5.x/initials/svg?seed=${firstNameInitial}`
}
