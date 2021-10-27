//////////////////////////////
/// Import Dependencies
//////////////////////////////
require('dotenv').config()
const mongoose = require('mongoose')


//////////////////////////////
// Establish connection
//////////////////////////////


// setup mongoose connect
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewURLParser: true,
    useUnifiedTopology:true
}

// connect to mongoose
mongoose.connect(DATABASE_URL, CONFIG)


//connection messages
mongoose.connection
.on('open', () => console.log('connected to mongoose'))
.on('close', () => console.log('disconnected from mongoose'))


//////////////////////////////
// Export
//////////////////////////////

module.exports = mongoose