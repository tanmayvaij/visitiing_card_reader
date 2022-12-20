const express = require("express")
const path = require("path")

const app = express()

app.use("/static", express.static(path.join(__dirname, "public")))

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
    res.status(200).render("index")
})

app.listen(5000, () => {
    console.log("App started successfully")
})
