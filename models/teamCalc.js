const teamCalc = (comp) => { // comp is an object
    const statAdd = (stat) => { // stat is a numeric value
        let total = 0
        total += comp.top[stat]
        total += comp.jg[stat]
        total += comp.mid[stat]
        total += comp.adc[stat]
        total += comp.sup[stat]
        return total
    }
    
    const stats = {}
    
    stats.poke = statAdd("poke")
    stats.engage = statAdd("engage")
    stats.disengage = statAdd("disengage")
    stats.skirmish = statAdd("skirmish")
    stats.splitPushing = statAdd("splitPushing")
    stats.earlyGame = statAdd("earlyGame")
    stats.scaling = statAdd("scaling")
    stats.utility = statAdd("utility")
    stats.dps = statAdd("dps")
    stats.burst = statAdd("burst")
    stats.tankiness = statAdd("tankiness")
    stats.mobility = statAdd("mobility")

    return stats
}

module.exports = teamCalc