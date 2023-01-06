require("dotenv").config();
const { rejects } = require("assert");
const AWS = require("aws-sdk");
const e = require("express");
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const config = require("./config");
const fsService = require("./fs-service");

const bucketName = config.s3UploadBucket;
const region = config.s3Creds.bucketRegion;
const accessKey = config.s3Creds.accessKey;
const secretAccessKey = config.s3Creds.secretAccessKey;

async function deleteFolder(s3DirectoryPath) {
  try {
    AWS.config.update({
      region: region,
    });
    const s3 = new AWS.S3();
    
    const listParams = {
      Bucket: bucketName,
      Prefix: s3DirectoryPath,
    };
    //getting all the objects with prefix of dir
    const res =  await s3.listObjectsV2(listParams).promise();

    if (res.Contents.length === 0) return; //empty folder delete

    const deleteParams = {
      Bucket: bucketName,
      Delete: { Objects: [] },
    };
    //pushing all the keys that need to be deleted in the object
    res.Contents.forEach(({Key}) => {
      deleteParams.Delete.Objects.push({Key});
    });
    //deleting all the keys
    await s3.deleteObjects(deleteParams).promise();

    //as listObjectV2 returns upto 1000 keys we will check if there are more keys present
    if (listParams.IsTruncated) await deleteFolder(s3DirectoryPath);

  } catch (error) {
    console.log(error,"deleteFolder error");
  }
}

async function copyFolderS3ToS3Service(s3SourcePath,s3TargetPath){
    try {
      AWS.config.update({
        region: region,
      });
      const s3 = new AWS.S3();
      var options = {
        Bucket:bucketName,
        Prefix:s3SourcePath
      }
      //list all the objects that needs to be copied
      const res = await s3.listObjectsV2(options).promise();

      res.Contents.forEach(async function(obj){
        var lockey = obj.Key.replace(s3SourcePath,s3TargetPath);
         var params = {                   
          Bucket:bucketName,
          CopySource: '/' + bucketName + '/' + obj.Key,
          Key: lockey
          
        }
        //copy each object
       await s3.copyObject(params).promise();
      });
    } catch (error) {
      console.log(error,"copyFolderS3ToS3Service error");
    }
}

async function uploadToS3(params) {
  try {
    // Uploading files to the bucket
    //AWS.config.update({ region: process.env.AWS_BUCKET_REGION });
    const s3 = new AWS.S3();
    await s3.upload(params).promise();
  } catch (error) {
    console.log(error,"uploadToS3 error");
  }
}

async function getPresignedURL(Bucket, myKey) {
  try {
    //generating for presigned url for the specific key
    AWS.config.update({
      region: config.bucketRegion,
    });
    const s3 = new AWS.S3();
    const signedUrlExpireSeconds = 60 * 1000;

    const url = await s3.getSignedUrl("getObject", {
      Bucket: Bucket,
      Key: myKey,
      Expires: signedUrlExpireSeconds,
    });
    console.log(url);
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  getPresignedURL,
  // deleteObj,
  // uploadDir,
  uploadToS3,
  // copyObjPath,
  deleteFolder,
  copyFolderS3ToS3Service,
  // downloadObj
  // uploadFolderToS3,
};








