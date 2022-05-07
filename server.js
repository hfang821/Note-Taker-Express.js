const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { v4: uuidv4 } = require('uuid');

//creates the PORT OR use the localhost:3000
const PORT = process.env.PORT || 3000;

//body parsing, static and route middleware 
//express.urlendoced and express.json are used for POST and PUT requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//it adds the static middleware and starts listening on a port, __dirname is the root directory in this case
app.use(express.static('public'));

//app.get() functions
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data));
    });
});

//app.post() function
app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        if (err) throw err;
        let savedData = JSON.parse(data);
        savedData.push(req.body);
        //req.body.id=req._server.Symbol(async_id_symbol);
        //include a universal unique id
        req.body.id = uuidv4();
        console.log('id of the request: ' + req.body.id);

        res.json(fs.writeFile('./db/db.json', JSON.stringify(savedData), err => {
            if (err) throw err;
            console.log("New Notes successfully created!")
        }));
    });
});

//app.delete function
//Ask TA: how to connect the id of the notes
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) throw err;
        console.log(req.params.id);
        savedData = JSON.parse(data);
        console.log(savedData);
        const filteredArr = []; 
        //creates a new array filled with elements do not have the selected id.
      // const newArr = savedData.filter(notes => { notes.id !== req.params.id });
        for (let i = 0; i < savedData.length; i++) {
            const element = savedData[i];
            //console.log(element); 
            if(element.id !== req.params.id) {
                filteredArr.push(element);
            }
        }
        console.log(filteredArr);
        //overwrite the json file with the newly created array
        fs.writeFile('./db/db.json', JSON.stringify(filteredArr), err=>{
            if (err) throw err;
            //console.log("You have deleted this note.")
            res.send(`note ${req.params.id} has been deleted`);
        });
    });
});


app.get('*', (req, res) => {
    //it would be cool to make a customized 404 html page.
    res.send('sorry 404');
});

//Display the message once port has established.
app.listen(PORT, function () {
    console.log('listening on PORT: ' + PORT);
})