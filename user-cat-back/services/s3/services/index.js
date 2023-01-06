const s3Service = require('./s3-service');
const fsService = require('./fs-service');
const config = require('./config');
const fs = require('fs')
const AWS = require('aws-sdk')
const bucketName = config.s3UploadBucket;
const region = config.s3Creds.bucketRegion;
const accessKey = config.s3Creds.accessKey;
const secretAccessKey = config.s3Creds.secretAccessKey;

async function deleteFolder(s3DirectoryPath){
    try {
        //delete a directory which is present in s3 bucket
        await s3Service.deleteFolder(s3DirectoryPath);
    } catch (error) {
        console.log(error);
    }
}

async function uploadFolderToS3(localDirectoryPath){
    try {
        //Reads all paths from the directory and getting all the file paths 
        var output = [];
        const filePaths = fsService.getAllFilePaths(localDirectoryPath,output);
        
        //Iterating on each file path and then uploading
        for(let i=0;i<filePaths.length;i++){
            let file = filePaths[i];
            await uploadFile(file.changeFilePath);
        } 
    } catch (error) {
        console.log(error);
    }
}

//upload single file to s3 method
async function uploadFile(filePath) {
    let params = {
      Bucket: bucketName,
      Key: filePath , 
      Body: fs.readFileSync(filePath) 
    };
    //uploading an object to s3 having properties of params
    const res = await s3Service.uploadToS3(params)
}

//method to download a folder
async function downloadFolder(key){
    //Download a directory which is present in a s3 bucket
    const res = await s3Service.getPresignedURL(bucketName,key);

    return res;
}


async function copyfolderS3ToS3(s3DirectoryPath,target){
    try {
        //copying a folder from s3 to s3
        const res = await s3Service.copyFolderS3ToS3Service(s3DirectoryPath,target);
          
    } catch (error) {
        console.log(error);
    }
}

async function BigFileCreateMultiPart(localDirectoryPath,filePath){
    AWS.config.update({
        region: region,
      });
      const S3 = new AWS.S3();
    var params = {
        Bucket: bucketName,
        Key: localDirectoryPath,
        ACL: "public-read",
        StorageClass: 'STANDARD'
    }
    let multipartCreateResult = await S3.createMultipartUpload(params).promise();

    let chunkCount = 1;

let uploadPartResults = []

fs.open(filePath, 'r', function (err, fd) {
    if (err) throw err;

    function readNextChunk() {
        fs.read(fd, buffer, 0, CHUNK_SIZE, null, async function (err, nread) {
            if (err) throw err;

            if (nread === 0) {
            // done reading file, do any necessary finalization steps
                fs.close(fd, function (err) {
                    if (err) throw err;
                });
                return;
            }

            var data;

            if (nread < CHUNK_SIZE) {
                data = buffer.slice(0, nread);
            }
            else {
                data = buffer;
            }

            let uploadPromiseResult = await S3.uploadPart({
                Body: data,
                Bucket: bucketName,
                Key: localDirectoryPath,
                PartNumber: chunkCount,
                UploadId: multipartCreateResult.UploadId,
            }).promise()

            uploadPartResults.push({
                PartNumber: chunkCount,
                ETag: uploadPromiseResult.ETag
            })

            chunkCount++;

            readNextChunk()

        });

    }

    readNextChunk();
})

let completeUploadResponce = await S3.completeMultipartUpload({
    Bucket: bucketName,
    Key: localDirectoryPath,
    MultipartUpload: {
        Parts: uploadPartResults
    },
    UploadId: multipartCreateResult.UploadId
}).promise();

}

// async function initializingMultipart() {
//     try{
//       AWS.config.update({
//           region: region,
//       });
//       let s3 = new AWS.S3();
//       let key = "movie.mp4";
  
//       let params = {
//           Bucket: bucketName,
//           Key: key,
//       };
  
//       let filePath = "./" + key;
      
//       let uploadObj = await s3.createMultipartUpload(params).promise();
  
//       let uploadPartResults = await uploadFilePartsToS3(filePath,uploadObj.UploadId,s3,key);
  
//       await s3.completeMultipartUpload({
//           Bucket: bucketName,
//           Key: key,
//           MultipartUpload: {
//           Parts: uploadPartResults,
//           },
//           UploadId: uploadObj.UploadId,
//       }).promise();
  
//       console.log('file uploaded successfully');
  
//     }catch(err){
//       console.log(err)
//     }
  
  
//   }

module.exports = {
    copyfolderS3ToS3,
    downloadFolder,
    uploadFolderToS3,
    deleteFolder,
    BigFileCreateMultiPart,

}