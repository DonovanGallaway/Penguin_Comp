////////////////////////////
// Import Dependencies
////////////////////////////

const mongoose = require('./connection')
const Comp = require('./comps')
const champs = require('./champs')

const makeAZ = (string) =>{
    const alphabet ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const splitString = string.split('')
    for (let i = 0; i < string.length; i++){
        !alphabet.includes(splitString[i]) ? "" : splitString[i]
    }
    return splitString.join('')
}

////////////////////////////
// Seed Code
////////////////////////////

const db = mongoose.connection

db.on('open', () =>{
    const starterComp = [
        {name: "Test Comp", top: "Dr Mundo", jg: "Xin Zhao", mid: "Viktor", adc: "Senna", sup: "Tahm Kench"}
    ]
    Comp.deleteMany({}).then((data) =>{
        Comp.create(starterComp).then((data) =>{
            //     const compData = {
            //     top: champs.allChamps[data[0].top],
            //     jg: champs.allChamps[data[0].jg],
            //     mid: champs.allChamps[data[0].mid],
            //     adc: champs.allChamps[data[0].adc],
            //     sup: champs.allChamps[data[0].sup]
            // }
            // console.log(compData)
            db.close()
        })
    })
})