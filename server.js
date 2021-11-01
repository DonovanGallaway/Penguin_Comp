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
const UserRouter = require('./controllers/user')
const session = require('express-session')
const MongoStore = require('connect-mongo')



///////////////////////////////////
// Middleware
///////////////////////////////////

app.use(morgan('tiny'))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    resave: false
}))



///////////////////////////////////
// Routes
///////////////////////////////////

app.use('/comps', CompRouter)
app.use('/user', UserRouter)


// route
app.get('/', (req,res) =>{
    res.render('index')
})







/////////////////////////
// Listener
/////////////////////////

const PORT = process.env.PORT
app.listen(PORT, console.log('Listening on port', PORT))