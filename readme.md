# Project 2
#### By Donovan Gallaway

## Project Summary

My project is definitely on the ambitious side in terms of final build, but is essentially a full-CRUD app that allows a user to put together lists of their favorite champions, as well as team compositions. This is pretty simple and I'll probably have it running by the end of Day 1, but the trick comes into the next part:

The app should be able to recommend other champions for a team composition based on user criteria, and eventually generated automatically based on already selected champions/enemy champions.

![Visual Mockup of Later-Stage App](/test/mockup.png)

I already have Riot Games' "Data Dragon," a collection of game assets, and a hard-coded set of criteria about each champion put together by myself and a League-playing friend of mine. I have a Riot API Dev Key to make calls in the app (at least for testing), though I don't think I need it for the project iterations.

**However, MVP is just the team compositions and I will work on that first**

## Models

For the simple build, there will be a team composition model:

- Top Laner ([{name: String, img: String}])
- Jungler ([{name: String, img: String}])
- Mid Laner ([{name: String, img: String}])
- AD Carry ([{name: String, img: String}])
- Support ([{name: String, img: String}])

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

None yet!

## List of Technologies

- Agile CMS (Contentful)
- MongoDB
- Node
- Express
- Liquid
- CSS
- JQuery

## I'm Very Hungry For More
I made this with the intention of being a portfolio piece, as well as a tool my friends and I will use. As such, I've already put a bit of work into it but will need to restructure to make use of Unit 2's technologies.

Eventually, this should be a very interactive application that should be actively useful for League players trying to draft a team composition, especially in coordinated play but (in a more limited range) in Solo Ranked Play.

Eventually, I will add functionality to pull current-lobby data from the Riot API to dynamically recommend champions in real time with a downloaded application. I may also reach out to high-level League players and analysts to get their help in refining the champion dataset and maybe even the champion model.

But that's more of a mid/long-term goal :)