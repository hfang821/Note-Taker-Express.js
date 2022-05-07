/* Obsolete File: 
//1. write a script that creats a server at loacl host: port 3001 and Heroku server
//2. Deploy the front-end application on the server.
//3. use app.post function to take in submissions by the user.
//4. use app.get to get the inputs && transfer them into the db.json file.
//5. write the file to the front-end application.

//Creates an Express application by requiring the modules

const express = require('express');
const path = require('path');
const fs = require('fs');

const app= express();

//creates the PORT OR use the localhost:3000
const PORT = process.env.PORT || 3000;

//body parsing, static and route middleware 
//express.urlendoced and express.json are used for POST and PUT requests
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//it adds the static middleware and starts listening on a port, __dirname is the root directory in this case
app.use(express.static('public'));

//This is a way to shorten the path.
//require('./routes/routes')(app);

 //should I do fs.readfile inside the app.get functions or should i do this?
    //for the app.post functions, should we do a fs.writeFile?
fs.readFile("./db/db.json","utf8", (err,data)=> {

        //does throw err means console.log(err)?
    if(err) throw err;

    let newNotes = JSON.parse(data);

    app.get("/api/notes", function(req,res){
            
        res.json([newNotes]);
    })

    app.post("/api/notes",function(req,res){
        let notes = req.body;
        newNotes.push(notes);
        //create a update function;
        updateWebsite();
        console.log("new notes successfully created!")
    });

    app.get("/api/notes/:id", function(req, res){
        res.json(newNotes[req.params.id]);
        //not sure what params are
    });

    app.delete("/api/notes/:id", function(req, res){
        notes.splice(req.params.id, 1);
        //update function
        updateWebsite();
        console.log("delete note with id: " + req.params.id);
    });

    app.get('/notes', function(req,res){
        res.sendFile(path.join(__dirname, './public/notes.html'))
        //sendFile function routes the html page (__dirname is the current directory that is executed)
        //does it join the json data with the html front end page?
    });

    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname, './public/index.html'));
    });

        
    function updateWebsite(){
        fs.writeFile("./db/db.json", JSON.stringify(newNotes), err => {
            if(err) throw err;
            return true;
            //why do we need to to have return true
        })
        }
    })

//Display the message once port has established.
app.listen(PORT, function(){
    console.log('listening on PORT: ' + PORT);
})
*/