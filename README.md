# Memory Game Challenge

A responsive memory match game built with React, Bootstrap, and CSS Grid.

## Features
- Start Screen: Engaging entrance animations.
- Game Screen: 30-second timer, interactive flipping cards, match validation with modals and sounds.
- Resolve Screen: Win/Loss states with a play again option.
- Responsive: Built using CSS Grid and Bootstrap to look great on desktop and mobile.
- Audio: Custom Web Audio API generated sound effects for ticks, matches, and mismatches.

## Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

## Installation & Running Locally

1. Open your terminal and navigate to the project directory.
2. Install the dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Open your browser and navigate to the URL provided in the terminal (usually http://localhost:5173).

## Project Structure
- src/components: Contains the React components (StartScreen, GameScreen, ResolveScreen, Card).
- src/index.css: Contains all custom styling, CSS Grid layouts, and CSS keyframe animations.
- src/utils/audio.js: Contains logic for sound effects using the Web Audio API.

## Built With
- React
- React Bootstrap
- CSS Grid
- Vite
