/////////////////////////
// Dependencies
/////////////////////////

// Import dependencies
require("dotenv").config()
const express = require('express')
const path = require('path')
const liquid = require('liquid-express-views')
const app = liquid(express(),{root:[path.resolve(__dirname,'views/')]})
const morgan = require('morgan')
const methodOverride = require('method-override')


const champs = require('./models/champs')
const CompRouter = require('./controllers/comps')



///////////////////////////////////
// Middleware
///////////////////////////////////

app.use(morgan('tiny'))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



///////////////////////////////////
// Routes
///////////////////////////////////

app.use('/comps', CompRouter)


// route
app.get('/', (req,res) =>{
    res.json(champs.allChamps)
})







/////////////////////////
// Listener
/////////////////////////

const PORT = process.env.PORT
app.listen(PORT, console.log('Listening on port', PORT))