const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
// import routes
const authRoute = require('./routes/auth');

const db = mongoose.connection

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("connection successful"))
.catch(err => console.log(err))

db.on('error', err => {
    console.error('connection error:', err)
  })

app.use(cors());
app.use(express.json());

// Route middleware
app.use('/', authRoute)

// starting get api
app.get('/', (req, res) => {
    res.send({msg: 'root api created'})
})


app.listen(process.env.PORT || 5000, () => { 
    console.log("server is running")
}); 