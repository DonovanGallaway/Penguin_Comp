const getChamps = (allChamps, champSet) =>{
    let poke = 0
    let engage = 0
    let disengage = 0

    let skirmish = 0
    let teamfight = 0

    let earlyGame = 0
    let scaling = 0

    // add each stat and evaluate according to given stats
    champSet.forEach((value) =>{
        poke += value.poke
        engage += value.engage
        disengage += value.disengage
        skirmish += value.skirmish
        teamfight += value.teamfight
        earlyGame += value.earlyGame
        scaling += value.scaling
    })

    let comp = null
    let fighting = null
    let scale = null

    if (disengage >= engage && disengage >= poke){
        comp = "disengage"
    } else if (poke >= engage && poke >= disengage){
        comp = "poke"
    } else if (engage >= poke && engage >= disengage){
        comp = "engage"
    } else {
        comp = 'zero'
    }
    // The above slightly favors engage comps, as these are most prevalent in the meta

    if (teamfight >= skirmish){
        fighting = "teamfight"
    } else if (skirmish > teamfight){
        fighting = 'skirmish'
    } else {
        fighting = 'zero'
    }
    // Slightly favors teamfights, somewhat arbitrarily

    if (earlyGame > scaling){
        scale = 'scaling'
    } else if (scaling >= earlyGame){
        scale = 'earlyGame'
    } else {
        scale = 'zero'
    }
    // Slightly favors early champs, as snowballing is subjectively valued well in meta

    // total add
    const sortChamp = allChamps.items.sort((a,b) =>{
        const aCombat = a.fields.utility+a.fields.dps+a.fields.burst+a.fields.tankiness+a.fields.mobility
        const bCombat = b.fields.utility+b.fields.dps+b.fields.burst+b.fields.tankiness+b.fields.mobility
        const aStat = a.fields[fighting]+a.fields[comp]+a.fields[scale]+aCombat
        const bStat = b.fields[fighting]+b.fields[comp]+b.fields[scale]+bCombat
        return aStat - bStat
    })

    const topChamp = sortChamp.filter((x)=>x.fields.top)
    const jgChamp = sortChamp.filter((x)=>x.fields.jungler)
    const midChamp = sortChamp.filter((x)=>x.fields.mid)
    const botChamp = sortChamp.filter((x)=>x.fields.adc)
    const supChamp = sortChamp.filter((x)=>x.fields.support)
    const blindChamp = sortChamp.filter((x)=>x.fields.blindPick)
    const flexChamp = sortChamp.filter((x)=>x.fields.flex)

    // for use at start of comp to give more blind options

    const topBlind = sortChamp.filter((x)=>{return x.fields.top && x.fields.blindPick})
    const jgBlind = sortChamp.filter((x)=>{return x.fields.jungler && x.fields.blindPick})
    const midBlind = sortChamp.filter((x)=>{return x.fields.mid && x.fields.blindPick})
    const adcBlind = sortChamp.filter((x)=>{return x.fields.adc && x.fields.blindPick})
    const supBlind = sortChamp.filter((x)=>{return x.fields.support && x.fields.blindPick})
    const flexBlind = sortChamp.filter((x)=>{return x.fields.flex && x.fields.blindPick})

    const recs = {
        topRecs: topChamp.slice(0,10),
        jungleRecs: jgChamp.slice(0,10),
        midRecs: midChamp.slice(0,10),
        botRecs: botChamp.slice(0,10),
        supRecs: supChamp.slice(0,10),
        blindRecs: blindChamp.slice(0,10),
        flexRecs: flexChamp.slice(0,10),
        topBlind: topBlind.slice(0,10),
        jgBlind: jgBlind.slice(0,10),
        midBlind: midBlind.slice(0,10),
        adcBlind: adcBlind.slice(0,10),
        supBlind: supBlind.slice(0,10),
        flexBlind: flexBlind.slice(0,10)
    }

    console.log(recs)

    return recs

}

$(document).ready(()=>{
    $.getJSON('/rawChamps.json', (data) =>{
        const statCheck = new Set()
        for (let i = 0; i < data.items.length; i++){
            const champ = data.items[i].fields
            data[champ.name] = champ
            champ.zero = 0
        }
        // console.log(statCheck)
        // console.log(data.items)
        // statCheck.forEach((value)=>{
        //     const champ = value.name
        //     console.log(champ)
        // })
        const champRecs = getChamps(data, statCheck)
        
        $('#top-recs').empty()
        $('#jungle-recs').empty()
        $('#mid-recs').empty()
        $('#bot-recs').empty()
        $('#sup-recs').empty()
        $('#blind-recs').empty()
        $('#flex-recs').empty()                
        for (let i=0; i<10; i++){
            $('#blind-recs').append($('<li>').text(champRecs.blindRecs[i].fields.name))
            $('#top-recs').append($('<li>').text(champRecs.topBlind[i].fields.name))
            $('#jungle-recs').append($('<li>').text(champRecs.jgBlind[i].fields.name))
            $('#mid-recs').append($('<li>').text(champRecs.midBlind[i].fields.name))
            $('#bot-recs').append($('<li>').text(champRecs.adcBlind[i].fields.name))
            $('#sup-recs').append($('<li>').text(champRecs.supBlind[i].fields.name))
            $('#flex-recs').append($('<li>').text(champRecs.flexBlind[i].fields.name))
        }
    })
})


$('.stat-button').each(function(index){
    $(this).on('click', ()=>{
        console.log($(this).attr('stat'))
    })
})

$('select').each(function(){
    $(this).change(()=>{
        $('select option:selected').each(function(){
        if($(this).text())
            $.getJSON('/rawChamps.json', (data) =>{
                const statCheck = new Set()
                for (let i = 0; i < data.items.length; i++){
                    const champ = data.items[i].fields
                    data[champ.name] = champ
                    champ.zero = 0
                }
                const thisChamp = data[$(this).text()]
                statCheck.add(thisChamp)
                // console.log(statCheck)
                // console.log(data.items)
                // statCheck.forEach((value)=>{
                //     const champ = value.name
                //     console.log(champ)
                // })
                const champRecs = getChamps(data, statCheck)
                $('#top-recs').empty()
                $('#jungle-recs').empty()
                $('#mid-recs').empty()
                $('#bot-recs').empty()
                $('#sup-recs').empty()
                $('#blind-recs').empty()
                $('#flex-recs').empty()                
                for (let i=0; i<10; i++){
                    $('#top-recs').append($('<li>').text(champRecs.topRecs[i].fields.name))
                    $('#jungle-recs').append($('<li>').text(champRecs.jungleRecs[i].fields.name))
                    $('#mid-recs').append($('<li>').text(champRecs.midRecs[i].fields.name))
                    $('#bot-recs').append($('<li>').text(champRecs.botRecs[i].fields.name))
                    $('#sup-recs').append($('<li>').text(champRecs.supRecs[i].fields.name))
                    $('#blind-recs').append($('<li>').text(champRecs.blindRecs[i].fields.name))
                    $('#flex-recs').append($('<li>').text(champRecs.flexRecs[i].fields.name))
                }
            })
            
        })
    })
})