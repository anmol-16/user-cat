const express = require('express');
const UserSchema = require('../../model/user.model');
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer')
const userModel = require('../../model/user.model');
const { result } = require('lodash');
const AdminSchema = require('../../model/super-admin.model');
const { count } = require('console');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  var uploads = multer({ storage: storage })

const addNewSA = async (req, res) => {
    try {
        const {firstName, lastName, email, phoneNumber,image,type,adminId} = req.body;
        const admin = await UserSchema.create({
            firstName, 
            lastName, 
            email, 
            phoneNumber,
            image,
            type,
            adminId:""
        })
        return res.json({
            status:true,
            user:admin
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status:true,
            msg:"Could not add a new SA"
        })
    }
}

const addUserToAdmin = async (req, res) => {
    try {
        const paramsId = req.params.id;
        const {firstName, lastName, email, phoneNumber,image,type,adminId} = req.body;
        const uniqueUser = await UserSchema.create({
            firstName, 
            lastName, 
            email, 
            phoneNumber,
            image,
            type,
            adminId:paramsId
        });
        return res.json({
            status:true,
            data:uniqueUser
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status:false,
            msg:"User can't be saved"
        })
    }
}

const fetchUsersInSA = async (req, res) => {
    try {
        const paramsId = req.params.id;
        const pageNumbers = req.query.pageNumbers;
        let userRes = await UserSchema.find({adminId:paramsId}).skip(10*(pageNumbers-1)).sort({firstName:1}).limit(10);
        let count = await UserSchema.find({adminId:paramsId}).count();
        return res.json({
            status:true,
            data:userRes,
            count:count
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status:false,
            msg:"Can not fetch users"
        })
    }
}

const deleteUserInSA = async (req, res, next) => {
    try {const userToBeDeleted = req.params.userId
        await UserSchema.findByIdAndDelete(userToBeDeleted);
        return res.json({
            status:true,
            code:"200",
            msg:"user is deleted"
        })
    } catch (error) {
        console.log(error);
        console.log("User can not be saved");
    }
};

const updateUserDetailsInSA = async (req, res, next) =>{
    try {
        const {firstName, lastName, email, phoneNumber,image} = req.body;
        const userUpdateId = req.params.userId;
        const currentUser =  await UserSchema.findByIdAndUpdate(userUpdateId,{
            firstName, 
            lastName, 
            email, 
            phoneNumber,
            image
        });
        console.log(currentUser);
        return res.json({
            status:true,
            code:"200",
            msg:"User updated successfully"
        })
    } catch (error) {
        console.log(error);
        console.log("User can't be updated");
        return res.json({
            status:false,
            code:"201",
            msg:"User can't be saved"
        })
    }
}

const searchUserInSA = async(req, res) => {
    try {
        let pageNumbers = req.query.pageNumbers;
        await UserSchema.find({'adminId':req.params.id,"firstName":{ $regex:req.query.firstName, $options:"i"}}).skip(4*(pageNumbers-1)).limit(4).then((results)=>{
            res.json({
                status:true,
                data:results
            })
         })
    } catch (error) {
        console.log(error);
        return res.json({
            
        })
    }
}
const getUserdetailsInSA = async (req, res) => {
    try {
        const profileDetails = await UserSchema.findById(req.params.userId)
        return res.json({
            status:true,
            msg:"details are shown",
            data: profileDetails
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status:true,
            msg:"error occcured"
        })
    }

}

const bulkImportInSA = async (req,res) => {
    try {
        // const bulkRes = await UserSchema.deleteMany({firstName:""});
        // res.json({
        //     status:true,
        //         msg:"successfully done",
        //         bulkRes:bulkRes
        // })

        const file = req.file
        const data = JSON.parse(fs.readFileSync('C:/Users/anmol/OneDrive/Desktop/User-cat/user-cat-back/services/user-service/random.json','utf-8'));
        const bulkRes = await UserSchema.insertMany(data);
        res.json({
            status:true,
                msg:"successfully done",
                bulkRes:bulkRes
        })

        
         
    } catch (error) {
        console.log(error);
        return res.json({
            status:false,
            msg:"Bulk Import did not occur"
        })
    }
}

module.exports = {
    deleteUserInSA,
    updateUserDetailsInSA,
    getUserdetailsInSA,
    bulkImportInSA,
    fetchUsersInSA, //fetchAllUsers
    searchUserInSA,
    addNewSA,
    addUserToAdmin
   
}