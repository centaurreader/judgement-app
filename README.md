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

## Testing

Tests are run with Jest. Test files should reside in directories named `__tests__` located adjacent to the source code.

Test files should be named `<module-name>.test.(ts|tsx)`.

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
- [ ] transform data and write json output
  - [x] champions
    - [x] make common innate abilities an object w/ id
    - [x] fix common innate ability names
    - [x] make gods an object w/ id
  - [x] gods
    - [x] add champion IDs
  - [ ] add jest and test
  - [ ] write json data to disk
  - [ ] codegen typescript types
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
