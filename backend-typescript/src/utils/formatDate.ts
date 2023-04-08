// Code snippet adapted from ZZB and Sunil Garg
// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
export const formatDate = (date: Date) => {
    const currentTime = new Date()
    const secondsPast = Math.floor(
        (currentTime.getTime() - date.getTime()) / 1000,
    )
    if (secondsPast < 60) {
        return `uploaded seconds ago`
    }
    if (secondsPast < 3600) {
        return `uploaded ${Math.floor(secondsPast / 60)} minutes ago`
    }
    if (secondsPast <= 86400) {
        return `uploaded ${Math.floor(secondsPast / 3600)} hours ago`
    }
    if (secondsPast > 86400) {
        return `uploaded days ago`
    }
    return ''
}
