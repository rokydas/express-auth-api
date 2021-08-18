const express = require("express")
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vetwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to db")
    })

// import routes
const authRoute = require('./routes/auth');

// Route middleware
app.use('/api/user', authRoute)


app.listen(3000, () => console.log("server running"))