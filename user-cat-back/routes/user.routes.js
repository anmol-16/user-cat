const express = require('express')

const {
    updateUserDetailsInSA,
    deleteUserInSA,
    getUserdetailsInSA,
    bulkImportInSA,
    fetchUsersInSA,
    searchUserInSA,
    addNewSA,
    addUserToAdmin
   
} = require('../services/user-service/user.service');

const userRouter = express.Router();

userRouter
    .put('/:id/update-user/:userId',updateUserDetailsInSA)
    .delete('/:id/delete-user/:userId',deleteUserInSA)
    .get('/:id/user-details/:userId',getUserdetailsInSA)
    .post('/:id/bulk-import',bulkImportInSA)
    .get('/:id/all-users',fetchUsersInSA)
    .get('/:id/search',searchUserInSA)
    .post('/add-new-admin',addNewSA)
    .post('/:id/add-user-to-admin',addUserToAdmin)

module.exports = userRouter