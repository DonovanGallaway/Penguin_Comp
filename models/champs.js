const rawChamps = require('./rawChamps.json')

const allChamps = {}
const topChamps = {}
const jgChamps = {}
const midChamps = {}
const botChamps = {}
const supChamps = {}
const blindChamps = {}
const flexChamps = {}

for (let i = 0; i < rawChamps.items.length; i++){
    const champ = rawChamps.items[i].fields
    allChamps[champ.name] = champ
    if (champ.top){
        topChamps[champ.name] = champ
    }
    if (champ.jungler){
        jgChamps[champ.name] = champ
    } 
    if (champ.mid) {
        midChamps[champ.name] = champ
    }
    if (champ.adc) {
        botChamps[champ.name] = champ
    }
    if (champ.support) {
        supChamps[champ.name] = champ
    }
    if (champ.blindPick){
        blindChamps[champ.name] = champ
    }
    if (champ.flex){
        flexChamps[champ.name] = champ
    }
}

module.exports.allChamps = allChamps
module.exports.topChamps = topChamps
module.exports.jgChamps = jgChamps
module.exports.midChamps = midChamps
module.exports.botChamps = botChamps
module.exports.supChamps = supChamps
module.exports.blindChamps = blindChamps
module.exports.flexChamps = flexChamps