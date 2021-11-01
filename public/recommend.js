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
    }
    if (poke >= engage && poke >= disengage){
        comp = "poke"
    }
    if (engage >= poke && engage >= disengage){
        comp = "engage"
    }
    // The above slightly favors engage comps, as these are most prevalent in the meta

    if (teamfight >= skirmish){
        fighting = "teamfight"
    } else if (skirmish > teamfight){
        fighting = 'skirmish'
    }
    // Slightly favors teamfights, somewhat arbitrarily

    if (earlyGame > scaling){
        scale = 'scaling'
    } else if (scaling >= earlyGame){
        scale = 'earlyGame'
    }
    // Slightly favors early champs, as snowballing is subjectively valued well in meta

    // total add
    const sortChamp = allChamps.items.sort((a,b) =>{
        const aStat = a.fields[fighting]+a.fields[comp]+a.fields[scale]
        const bStat = b.fields[fighting]+b.fields[comp]+b.fields[scale]
        return aStat - bStat
    })

    const topChamp = sortChamp.filter((x)=>x.fields.top)
    const jgChamp = sortChamp.filter((x)=>x.fields.jungler)
    const midChamp = sortChamp.filter((x)=>x.fields.mid)
    const botChamp = sortChamp.filter((x)=>x.fields.adc)
    const supChamp = sortChamp.filter((x)=>x.fields.support)
    const blindChamp = sortChamp.filter((x)=>x.fields.blindPick)
    const flexChamp = sortChamp.filter((x)=>x.fields.flex)

    const recs = {
        topRecs: topChamp.slice(0,10),
        jungleRecs: jgChamp.slice(0,10),
        midRecs: midChamp.slice(0,10),
        botRecs: botChamp.slice(0,10),
        supRecs: supChamp.slice(0,10),
        blindRecs: blindChamp.slice(0,10),
        flexRecs: flexChamp.slice(0,10)
    }

    console.log(recs)

    return recs

}

$(document).ready(()=>{
    $.getJSON('../rawChamps.json', (data) =>{
        const statCheck = new Set()
        for (let i = 0; i < data.items.length; i++){
            const champ = data.items[i].fields
            data[champ.name] = champ
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
            $.getJSON('../rawChamps.json', (data) =>{
                const statCheck = new Set()
                for (let i = 0; i < data.items.length; i++){
                    const champ = data.items[i].fields
                    data[champ.name] = champ
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