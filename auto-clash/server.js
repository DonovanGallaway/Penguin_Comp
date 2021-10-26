/////////////////////////
// Dependencies
/////////////////////////

require('dotenv').config()
const express = require('express')


const app = express()




// route
app.get('/', (req,res) =>{
    res.send('This App is working')
})







/////////////////////////
// Listener
/////////////////////////

const PORT = process.env.PORT
app.listen(PORT, console.log('Listening on port', PORT))