
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;


app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
let users = []; 
let flag = 1;

function readData() {
    const filename = "data.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    users = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "data.json";
    const jsonData = JSON.stringify(users);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/users", (req, res) => {
    readData();
    res.send(JSON.stringify(users));
})


app.post('/users', (req, res) => {
    if (users.length == 0)
        readData(); 
    let body = req.body;
    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        if (element.userName == body.userName) { 
            res.send("Already in use");
            flag = 0;
        }

    }
    if (flag >= 1) {
        users.push(body);
        saveData(); 
        res.send("successfully added");
    }

})


app.listen(1234, () => {
    console.log("Server available");
})