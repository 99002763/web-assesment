const app = require("express")();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/userRest.html");
})

app.listen(3333, () => {
    console.log("client side 3333");
})
