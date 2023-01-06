require("dotenv").config();
const { rejects } = require("assert");
const AWS = require("aws-sdk");
const express = require("express");
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const config = require("./config");
const util = require('util');
const chunkSize = 10 // MB
const bucketName = config.s3UploadBucket;
const region = config.s3Creds.bucketRegion;
const accessKey = config.s3Creds.accessKey;
const secretAccessKey = config.s3Creds.secretAccessKey;

function fileRead(filePath,uploadId,s3,key) {
  let chunkCount = 1;
  let uploadPartResults = [];
  return new Promise((resolve,reject)=>{
    try {
      let promises = [];
      const read = fs.createReadStream(filePath, { highWaterMark: 5*1024 * 1024 });
      read.on('data',function (chunk) {
        let chunkParams = {
          Body: chunk,
          Bucket: bucketName,
          Key: key,
          PartNumber: chunkCount++,
          UploadId: uploadId,
        };
        promises.push(s3.uploadPart(chunkParams).promise());
  
      });

      read.on('end',async function () {
        console.log("file read end");
        Promise.all(promises).then((uploadResponses)=>{
          uploadResponses.forEach((res, index)=> {
            uploadPartResults.push({
              PartNumber:index+1,
              ETag:res.ETag
            });
          })
          resolve(uploadPartResults);
        }).catch((uploadToS3PartsError)=>{
          reject(uploadToS3PartsError);
        })
      });
      
      read.on('error',function (fileReadError) {
        console.log("error file");
        reject(fileReadError);
      });
    } catch (createReadStreamException) {
      reject(createReadStreamException);
    }
  })
  
}

async function initializingMultipart() {
  AWS.config.update({
    region: region,
  });
  let s3 = new AWS.S3();
  let key = "qwerty.bin";

  let params = {
    Bucket: bucketName,
    Key: key,
  };

  let filePath = "./" + key;
  
  let uploadObj = await s3.createMultipartUpload(params).promise();
  fileRead(filePath,uploadObj.UploadId,s3,key).then(function(uploadPartResults){
    return s3.completeMultipartUpload({
      Bucket: bucketName,
      Key: key,
      MultipartUpload: {
        Parts: uploadPartResults,
      },
      UploadId: uploadObj.UploadId,
    })
    .promise();
  }).then(()=>{
      console.log("successfully Completed");
  }).catch((error)=>{
      console.log("error in uploading file",error);
  });
}

function uploadCopyTos3(uploadId,s3,key,newKey) {
  let chunkCount = 1;
  let uploadCopyPartResults = [];
  return new Promise((resolve,reject)=>{
    try {
      let promises = [];
      let params = {
        Bucket: bucketName,
          Key: key,
      }
      const read = s3.getObject(params).createReadStream({ highWaterMark: 10*1024*1024 });
      read.on('data',function () {
        let chunkParams = {
          Bucket: bucketName,
          Key: newKey,
          CopySource: "/bucketName/"+ key,
          PartNumber: chunkCount++,
          UploadId: uploadId,
        };
        promises.push(s3.uploadPartCopy(chunkParams).promise());
  
      });

      read.on('end',async function () {
        console.log("file read end");
        Promise.all(promises).then((uploadCopyResponses)=>{
          uploadCopyResponses.forEach((res, index)=> {
            uploadCopyPartResults.push({
              PartNumber:index+1,
              ETag:res.ETag
            });
          })
          resolve(uploadCopyPartResults);
        }).catch((uploadToS3PartsError)=>{
          reject(uploadToS3PartsError);
        })
      });
      
      read.on('error',function (fileReadError) {
        console.log("error file");
        reject(fileReadError);
      });
    } catch (createReadStreamException) {
      reject(createReadStreamException);
    }
  })
  
}
async function copyLargeFileToS3() {
  AWS.config.update({
    region: region,
  });
  let s3 = new AWS.S3();
  let key = "h.txt";
  let newKey = "copy-h.txt";
  let params = {
    Bucket: bucketName,
    Key: newKey,
  };
  
  let uploadObj = await s3.createMultipartUpload(params).promise();
  uploadCopyTos3(uploadObj.UploadId,s3,key,newKey).then(function(uploadCopyPartResults){
    return s3.completeMultipartUpload({
      Bucket: bucketName,
      Key: key,
      MultipartUpload: {
        Parts: uploadCopyPartResults,
      },
      UploadId: uploadObj.UploadId,
    })
    .promise();
  }).then(()=>{
      console.log("successfully Completed");
  }).catch((error)=>{
      console.log("error in Copying file",error);
  });
}
copyLargeFileToS3();

function downloadBigFile(){
  try {
    AWS.config.update({
      region: region,
    });
    let s3 = new AWS.S3();
    var params = {
      Bucket: bucketName, 
      Key: 'a.txt'
    };
    //getting an object and creating a read stream for the same
    let readStream = s3.getObject(params).createReadStream();

    //creating a write stream
    let writeStream = fs.createWriteStream(path.join(__dirname, 'asdf.txt'));
    //
    //connecting readstream and writestream using pipe
    readStream.pipe(writeStream);
  } catch (error) {
    console.log(error);
  }
}


async function getBucketVId(){
  try {
    AWS.config.update({
      region: region,
    });
    let s3 = new AWS.S3();
    var params = {
      Bucket: bucketName
     };
     let res = await s3.getBucketVersioning(params).promise();
     console.log(res);
 } catch (error) {
    console.log(error);
  }
}

async function changeBucketVersion(){
  try {
    AWS.config.update({
      region: region,
    });
    let s3 = new AWS.S3();
    var params = {
      Bucket: bucketName, 
      VersioningConfiguration: {
       MFADelete: "Disabled", 
       Status: "Enabled"
      }
     };
     await s3.putBucketVersioning(params).promise();
  } catch (error) {
    console.log(error);
  }
}


