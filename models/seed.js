////////////////////////////
// Import Dependencies
////////////////////////////

const mongoose = require('./connection')
const Comp = require('./comps')
const champs = require('./champs')

////////////////////////////
// Seed Code
////////////////////////////

const db = mongoose.connection

db.on('open', () =>{
    const starterComp = [
        {top: "Aatrox", jg: "Xin Zhao", mid: "Viktor", adc: "Senna", sup: "Tahm Kench"}
    ]
    Comp.deleteMany({}).then((data) =>{
        Comp.create(starterComp).then((data) =>{
                const compData = {
                top: champs.allChamps[data[0].top],
                jg: champs.allChamps[data[0].jg],
                mid: champs.allChamps[data[0].mid],
                adc: champs.allChamps[data[0].adc],
                sup: champs.allChamps[data[0].sup]
            }
            console.log(compData)
            db.close()
        })
    })
})