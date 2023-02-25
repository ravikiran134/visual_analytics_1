// Import necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');
var ejs = require("ejs");
const { constants } = require('buffer');

// Create an instance of the express app
const app = express();

// Public Folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// EJS
app.set('view engine', 'ejs');

const files = {};
// Define the route to display the files in a directory
app.get('/files', (req, res) => {
  // Define the directory path
  const directoryPath = 'C:/Users/user/Desktop/VA Assignments/project1/dataset';

  // Read the contents of the directory
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //console.log(files)
    // Send the file list as a response
    res.render("index",{files:files,fileContent:fileContent});
  });
});


// Define the route to display a specific file
app.get('/file/:fileName', (req, res) => {
  // Define the directory path and the file path
  const absoluteDirectoryPath = 'C:/Users/user/Desktop/VA Assignments/project1/dataset/';
  const decodedFileName = decodeURIComponent(req.params.fileName)
  //console.log(`File name is: ${decodedFileName}`);
  const filePath = path.join(absoluteDirectoryPath, decodedFileName);
  
  // Read the file and send it as a response
  
  fs.readFile(filePath, 'utf8',(err, fileContent) => {
    if (err) {
      return console.log('Unable to read file: ' + err);
    }
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    res.send(fileContent);
    
  });
  
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
