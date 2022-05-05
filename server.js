//1. write a script that creats a server at loacl host: port 3001 and Heroku server
//2. Deploy the front-end application on the server.
//3. use app.post function to take in submissions by the user.
//4. use app.get to get the inputs && transfer them into the db.json file.
//5. write the file to the front-end application.

//Creates an Express application
const express = require('express');
const path = require('path');

const app= express();

//creates the PORT OR use the localhost:3000
const PORT = process.env.PORT || 3000;

//Not sure what these do
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname));

//Why do we need to put (app)?
require('./routes/routes')(app);

app.listen(PORT, function(){
    console.log('listening on port' + PORT);
})