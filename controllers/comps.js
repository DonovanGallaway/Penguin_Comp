const express = require('express')
const Comp = require('../models/comps')
const champs = require('../models/champs')
const teamCalc = require('../models/teamCalc')

///////////////////////
// Create router
///////////////////////

const router = express.Router()


///////////////////////
// Routes
///////////////////////


/////////////////////////////
// Comp Routes
/////////////////////////////


// New Route
router.get('/new', (req,res) =>{
    res.render('new', {
        topChamps: champs.topChamps,
        jgChamps: champs.jgChamps,
        midChamps: champs.midChamps,
        botChamps: champs.botChamps,
        supChamps: champs.supChamps,
        allChamps: Object.keys(champs.allChamps).sort()

    })
})

// Create Route
router.post('/', (req,res) =>{
    if (!req.body.name){
        req.body.name = "Nameless"
    }
    Comp.create(req.body).then((comp) =>{
        res.redirect('/comps')
    })
    .catch((error) =>{
        res.json({error})
    })
})

// Index route
router.get('/', (req,res) =>{
    Comp.find({})
    .then((comps) =>{
        res.render('index', {comps})
    })
    .catch((error) => res.json(error))
})

// Recommendations Route
router.get('/builder', (req,res) =>{
    res.render('builder', {
        allChamps: Object.keys(champs.allChamps).sort(),
        topChamps: Object.keys(champs.topChamps).sort(),
        jgChamps: Object.keys(champs.jgChamps).sort(),
        midChamps: Object.keys(champs.midChamps).sort(),
        botChamps: Object.keys(champs.botChamps).sort(),
        supChamps: Object.keys(champs.supChamps).sort(),
        blindChamps: Object.keys(champs.blindChamps).sort(),
        flexChamps: Object.keys(champs.flexChamps).sort()
    })
})


// Show route
router.get('/:id', (req,res) =>{
    const id = req.params.id
    Comp.findById(id)
    .then((comp) =>{
        // console.log(comp)
        const compData = {
            top: champs.allChamps[comp.top],
            jg: champs.allChamps[comp.jg],
            mid: champs.allChamps[comp.mid],
            adc: champs.allChamps[comp.adc],
            sup: champs.allChamps[comp.sup]
        }
        // console.log(compData)
        const stats = teamCalc(compData)
        // console.log(stats)
        res.render('show', {comp, compData, stats})
    })
})

// Edit route
router.get('/:id/edit', (req,res) =>{
    const id = req.params.id
    Comp.findById(id).then((comp) =>{
        res.render('edit', {
            comp, 
            topChamps: champs.topChamps,
            jgChamps: champs.jgChamps,
            midChamps: champs.midChamps,
            botChamps: champs.botChamps,
            supChamps: champs.supChamps,
            allChamps: Object.keys(champs.allChamps).sort()

        })
    }).catch((error) => res.json(error))
})

// Update route
router.put('/:id', (req,res) =>{
    const id = req.params.id
    Comp.findByIdAndUpdate(id, req.body, {new:true}).then(() =>{
        res.redirect(`/comps/${id}`)
    })
})


// Delete route
router.delete('/:id', (req,res) =>{
    const id = req.params.id
    Comp.findByIdAndDelete(id).then(()=>{
        res.redirect('/comps')}) 
    }
)



///////////////////////////////
// Export router
///////////////////////////////

module.exports = router