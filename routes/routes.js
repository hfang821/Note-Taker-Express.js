const fs = require('fs');
const path = require('path');

//export the functionality of the server.
module.exports = app => {

    //should I do fs.readfile inside the app.get functions or should i do this?
    //for the app.post functions, should we do a fs.writeFile?
    fs.readFile("db/db.json","utf8", (err,data)=> {

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
            res.sendFile(path.join(__dirname, '../public/notes.html'))
            //sendFile function routes the html page (__dirname is the current directory that is executed)
            //does it join the json data with the html front end page?
        });

        app.get('*',function(req,res){
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        
        function updateWebsite(){
            fs.writeFile("db/db.json", JSON.stringify(newNotes), err => {
                if(err) throw err;
                return true;
                //why do we need to to have return true
            })
        }
    })
}