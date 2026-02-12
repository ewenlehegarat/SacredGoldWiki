const fs = require("fs");
const path = require("path");

const inputFile = "./csv/TrainerData.txt";
const outputFile = "./json/TrainerData.json";

const content = fs.readFileSync(inputFile, "utf-8");
const lines = content.split("\n");

const trainers = [];
let currentTrainer = null;
let currentPokemon = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  // New trainer
  if (line.match(/^\[\d+\]/)) {
    if (currentTrainer) {
      trainers.push(currentTrainer);
    }
    const match = line.match(/^\[(\d+)\]\s+(.+):$/);
    if (match) {
      currentTrainer = {
        id: parseInt(match[1]),
        name: match[2],
        pokemon: []
      };
      currentPokemon = null;
    }
  } else if (line && !line.startsWith("-") && line.includes(":")) {
    // Property like "Ability:", "Level:", etc.
    const [key, value] = line.split(":").map(s => s.trim());
    if (currentPokemon && key && value) {
      currentPokemon[key.toLowerCase()] = value;
    }
  } else if (line.startsWith("-")) {
    // Move
    if (currentPokemon) {
      if (!currentPokemon.moves) {
        currentPokemon.moves = [];
      }
      currentPokemon.moves.push(line.substring(1).trim());
    }
  } else if (line && !line.includes(":") && currentTrainer && line !== "") {
    // Pokemon name
    if (currentPokemon) {
      currentTrainer.pokemon.push(currentPokemon);
    }
    currentPokemon = {
      name: line
    };
  }
}

// Add last pokemon and trainer
if (currentPokemon && currentTrainer) {
  currentTrainer.pokemon.push(currentPokemon);
}
if (currentTrainer) {
  trainers.push(currentTrainer);
}

fs.writeFileSync(outputFile, JSON.stringify(trainers, null, 2));
console.log(`✔ TrainerData.txt → TrainerData.json (${trainers.length} trainers)`);
