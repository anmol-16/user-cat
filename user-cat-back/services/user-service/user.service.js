const express = require('express');
const UserSchema = require('../../model/user.model');
const mongoose = require('mongoose');
const fs = require('fs');
const userModel = require('../../model/user.model');
const { result } = require('lodash');
const AdminSchema = require('../../model/super-admin.model')

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
        let userRes = await UserSchema.find({adminId:paramsId}).sort({firstName:1});
        return res.json({
            status:true,
            data:userRes
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
        await UserSchema.find({'adminId':req.params.id,"firstName":{ $regex:req.query.firstName, $options:"i"}}).then((results)=>{
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
        const data = JSON.parse(fs.createReadStream('./sampleData.json','utf-8'));
        for(let i=0;i<data.length;i++){
            const bulkRes = await UserSchema.create(data);
            res.json({
                status:true,
                msg:"successfully done",
                bulkRes:bulkRes
            })
        }
        
         
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