$(document).ready( ()=>{
    $.getJSON('../rawChamps.json', (data) =>{
        console.log(data)
        for (let i = 0; i < data.items.length; i++){
            const champ = data.items[i].fields
            data[champ.name] = champ
        }
        $('body').on('click', '.one-champ', function(){
            $('.modal').css('display', 'block')
            $('.modal-img').attr('src', `${this.src}`)
            console.log(this)
            const champName = this.alt
            const thisChamp = data[champName]
            console.log(thisChamp)
            $('#champ-stats').append($('<li>').text(`name: ${thisChamp.name}`))
            $('#champ-stats').append($('<li>').text(`poke: ${thisChamp.poke}`))
            $('#champ-stats').append($('<li>').text(`engage: ${thisChamp.engage}`))
            $('#champ-stats').append($('<li>').text(`disengage: ${thisChamp.disengage}`))
            $('#champ-stats').append($('<li>').text(`skirmish: ${thisChamp.skirmish}`))
            $('#champ-stats').append($('<li>').text(`teamfight: ${thisChamp.teamfight}`))
            $('#champ-stats').append($('<li>').text(`splitPushing: ${thisChamp.splitPushing}`))
            $('#champ-stats').append($('<li>').text(`earlyGame: ${thisChamp.earlyGame}`))
            $('#champ-stats').append($('<li>').text(`scaling: ${thisChamp.scaling}`))
            $('#champ-stats').append($('<li>').text(`utility: ${thisChamp.utility}`))
            $('#champ-stats').append($('<li>').text(`dps: ${thisChamp.dps}`))
            $('#champ-stats').append($('<li>').text(`burst: ${thisChamp.burst}`))
            $('#champ-stats').append($('<li>').text(`tankiness: ${thisChamp.tankiness}`))
            $('#champ-stats').append($('<li>').text(`mobility: ${thisChamp.mobility}`))
        
        })
        
        $('.close').on('click', () =>{
            $('.modal').css('display', 'none')
            $('#champ-stats').empty()
        })
    })
})
