const mongoose = require('./connection')

//////////////////////////////
// Create Team Comp Model
//////////////////////////////

const {Schema, model} = mongoose

// make Team Schema

const teamSchema = new Schema({
    top: String,
    jg: String,
    mid: String,
    adc: String,
    sup: String
})

const Comp = model('Comp', teamSchema)


module.exports = Comp