# Judgement App

A web app game player aid for [Judgement: Eternal Champions](https://hallofeternalchampions.com/)

## Prerequisites

- npm
- node

## Get Started

1. `npm ci`
2. `npm start`

## Building

1. `npm run build`

## To Do

- [x] Hero card v0
  - [x] stats
  - [x] character info
  - [x] weapons
  - [x] control blocks
  - [x] active abilities
  - [x] combat manoevres
  - [x] unique innate abilities
- [x] Tooltip
- [x] Modals, sidepanels
- [x] Gameplay set up
  - [x] Set 3v3 or 5v5
  - [x] Choose god
  - [x] Choose heroes
  - [x] put game into state
- [ ] transform data in useJudgementApi hook
  - [ ] champions
    - [ ] make common innate abilities an object w/ id
    - [ ] make gods an object w/ id
    - [ ] transform the stats
  - [ ] gods
    - [ ] add champion IDs
  - [ ] add jest and test
- [ ] add conditions data
- [ ] Play layout
  - [ ] change health
  - [ ] level up hero
    - [ ] handle skill tree (skoll, isabel)
  - [ ] browse items
  - [ ] equip item(s)
  - [ ] track activations
  - [ ] reset all activations
- [ ] Local networking / online play
