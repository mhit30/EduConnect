import { File } from 'buffer'

require('dotenv').config()
const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

// Code Adapted from Sam Meech-Ward | https://www.sammeechward.com/storing-images-in-s3-from-node-server
const bucketRegion: any = process.env.AWS_BUCKET_REGION
const accessKey: any = process.env.AWS_ACCESS_KEY
const secretAccessKey: any = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        secretAccessKey: secretAccessKey,
        accessKeyId: accessKey,
    },
    region: bucketRegion,
})

export const getFileUrlFromBucket = async (bucketName: string, key: string) => {
    try {
        const getObjectParams = {
            Bucket: bucketName,
            Key: key,
        }
        const getCommand = new GetObjectCommand(getObjectParams)
        const fileUrl = await getSignedUrl(s3, getCommand, {
            expiresIn: 3600,
        })
        return fileUrl
    } catch (error) {
        return error
    }
}

export const putFileInBucket = async (
    bucketName: string,
    key: string,
    body: any,
    contentType: string,
) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
    }
    const putCommand = new PutObjectCommand(params)
    await s3.send(putCommand)
}
