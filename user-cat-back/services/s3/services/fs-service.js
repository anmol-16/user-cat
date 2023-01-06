const fs = require('fs');
const path = require('path');
let output = [];

// TODO: remove this file if not required;
//no global variables
function getAllFilePaths(dirPath){
    try {
        fs.readdirSync(dirPath).forEach(function (name) {
            var filePath = path.join(dirPath, name);
            let changeFilePath = filePath.replace(/\\/g, "/");  
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                output.push({changeFilePath});
            } else if (stat.isDirectory()) {    
                getAllFilePaths(filePath);
            }
        });
        return output;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllFilePaths
}