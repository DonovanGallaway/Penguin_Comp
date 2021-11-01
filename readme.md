# Project 2
#### By Donovan Gallaway

## Project Summary

My project is definitely on the ambitious side in terms of final build, but is essentially a full-CRUD app that allows a user to put together team compositions for League of Legends. 

The app is be able to recommend other champions for a team composition, generated automatically based on already selected champions. In the future, this can be expanded to include enemy champions selected.

![Visual of Team Builder](https://media.discordapp.net/attachments/294674217075474432/904712933676822548/unknown.png)

I have Riot Games' "Data Dragon" (a collection of game assets), and have a hard-coded set of criteria about each champion put together by myself and a League-playing friend of mine. I have a Riot API Dev Key to make calls in the app (at least for testing), though I don't think I need it for the project iterations.

## Models

For the simple build, there will be a team composition model:

- Top Laner ([{name: String}])
- Jungler ([{name: String}])
- Mid Laner ([{name: String}])
- AD Carry ([{name: String}])
- Support ([{name: String}])

The model used for Champion Data is as follows (already done):

- Name (String)
- Damage Type (String)
- Poke (Number)
- Engage (Number)
- Disengage (Number)
- Skirmish (Number)
- Teamfight (Number)
- Split Pushing (Number)
- Early Game (Number)
- Scaling (Number)
- Utility (Number)
- DPS (Number)
- Burst (Number)
- Tankiness (Number)
- Mobility (Number)
- Top/Mid/Jg/ADC/Support (Boolean) // These are five different values
- Blind Pick (Boolean)
- Flex Pick (Boolean)

These are all just criteria to evaluate the champions and help with sorting. The Booleans are only for sorting purposes, while the numbers are going to be displayed on show pages, as well as be used for sorting/comp evaluation.

There will (given time) also be a player model which will be:

- Username (String)
- Password (String/Hash) // if authentication implemented
- Favorite Champs ([{name: String, img: String}]) // Since every champ has a unique name, this should be fine



## Route Table

Here are the basic routes for the MVP, though these will expand to a fair degree with authentication

| url | method | action |
|-----|--------|--------|
| /Comps/ | get | show all put-together team compositions (index)|
| /Comps/:id | get | show a specific composition (show)|
| /Comps/new | get | render page to pick a team composition (new)|
| /Comps/ | post | add a new team composition (create)|
| /Comps/:id/edit | get | render page to change the team comp(edit)|
| /Comps/:id | put | change the selected team composition (update)|
| /Comps/:id | delete | delete the selected team comp (delete)|

## User Stories

**For MVP**
- A user should be able to see their list of created team compositions
- A user should be able to click a button on the home page/nav bar and add a composition
- A user should have an intuitive way of selecting the champs for each role
- A user should be able to save their selected compositions with a name
- A user should be able to edit compositions that they wish to
- A user should be able to delete compositions that they wish to

## Challenges

Oh boy, where do I start?

The first hurdle was just in terms of project scale and my own vision for it. Breaking this down into exact steps to avoid giving myself a panic attack was the first major step.

Another hill to climb was in getting champion names with special characters to render the corresponding images correctly. This was handled by handling the file names of the erring champions, since the champions are (relatively) static or change every couple of weeks at the absolute most.

CSS was a tricky thing in terms of getting it responsive, but it ended up working out fine.

Finally, in terms of things which directly impeded me, the biggest was the use of the "this" object in jQuery. For example

```js
$('#thing').on('click', function(){
    console.log(this)
})
```

returns "this" being undefined. The solution is that there is a *jQuery this*.

```js
$('#thing').onc('click', function(){
    console.log($(this))
})
```

This let me handle my elements correctly in writing some of the trickier JS.

## List of Technologies

- MongoDB
- Node
- Express
- Liquid
- CSS
- JQuery

## The Test Run

Some of my friends and I took the program for a brief test run. While it's certainly not a statistically valid sample size, we ***stomped*** the game we played together.

![Ranked Screenshot](https://media.discordapp.net/attachments/294674217075474432/904716160002572318/unknown.png)

## I'm Very Hungry For More
Eventually, this should be a very interactive application that should be actively useful for League players trying to draft a team composition, especially in coordinated play but (in a more limited range) in Solo Ranked Play.

Eventually, I will add functionality to pull current-lobby data from the Riot API to dynamically recommend champions in real time with a downloaded application. I may also reach out to high-level League players and analysts to get their help in refining the champion dataset and maybe even the champion model.

But that's more of a mid/long-term goal :)