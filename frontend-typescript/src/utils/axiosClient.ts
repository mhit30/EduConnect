import axios from 'axios'

// Code Adapted From https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios by Agustinus Theodorus
// Agustinus Theodorus: March, 9th, 2021
// Mohammed Hit: February, 12th, 2023

export const axiosClient = axios.create({
    baseURL: '',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})
