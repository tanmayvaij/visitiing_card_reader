const express = require("express")
const path = require("path")
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/static", express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views", "index.html"))
})

app.post("/save", (req, res) => {

    const { name, business, address, number, product } = req.body

    const db = new sqlite3.Database('./db/records.db', (err) => {
        if (err) console.error(err.message)
        console.log('Connected to the database.')
    })

    db.serialize(()=>{

        db.run(`INSERT INTO card_details VALUES ( '${name}', '${business}', '${address}', '${number}', '${product}' );`, (err) => {
            if (err) console.error(err.message)
            console.log('Inserted data successfully.')
        })

    })

    db.close((err) => {
        if (err) console.error(err.message)
        console.log('Close the database connection.')
        res.send(true)
    })

})

app.get("/read", (req, res) => {

    let records = []

    const db = new sqlite3.Database('./db/records.db', (err) => {
        if (err) console.error(err.message)
        console.log('Connected to the database.')
    })

    db.serialize(()=>{

        db.each("SELECT * FROM card_details", (err, row) => {
            if (err) console.error(err.message)
            records.push(row)
        })

    })

    db.close((err) => {
        if (err) console.error(err.message)
        console.log('Close the database connection.')
        res.send(records)
    })

})

app.listen(PORT, () => {
    console.log("App started successfully at http://127.0.0.1:5000")
})
