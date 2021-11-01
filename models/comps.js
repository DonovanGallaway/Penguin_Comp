const mongoose = require('./connection')

//////////////////////////////
// Create Team Comp Model
//////////////////////////////

const {Schema, model} = mongoose

// make Team Schema

const teamSchema = new Schema({
    name: String,
    top: String,
    jg: String,
    mid: String,
    adc: String,
    sup: String,
    username: String
})

const Comp = model('Comp', teamSchema)


module.exports = Comp