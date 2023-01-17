const fs = require('fs')
const csv = require('csvtojson');
async function fun(){
    const csvFilePath = 'C:/Users/anmol/OneDrive/Desktop/User-cat/user-cat-back/services/user-service/user-data.csv';
    const jsonArray=await csv().fromFile(csvFilePath);
    console.log(jsonArray)
}
fun();