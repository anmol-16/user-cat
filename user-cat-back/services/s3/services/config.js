module.exports = {
    s3UploadBucket:'lexev-main-s3',
    s3Creds:{
        bucketRegion:process.env.AWS_BUCKET_REGION,
        accessKey:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    }
    
}
// TODO: config file should be at the root level;