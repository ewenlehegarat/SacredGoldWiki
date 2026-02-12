const fs = require("fs");
const path = require("path");

const jsonFile = "./json/PokemonPersonalData.json";

// Lire le fichier JSON
const data = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));

// Traiter chaque pokémon
data.forEach(pokemon => {
  // Enlever les abilities vides
  if (!pokemon.Ability1 || pokemon.Ability1.trim() === "" || pokemon.Ability1.trim() === "-") {
    delete pokemon.Ability1;
  }
  
  if (!pokemon.Ability2 || pokemon.Ability2.trim() === "" || pokemon.Ability2.trim() === "-") {
    delete pokemon.Ability2;
  }

  // Enlever les types dupliqués
  if (pokemon.Type1 && pokemon.Type2 && pokemon.Type1 === pokemon.Type2) {
    pokemon.Type2 = "-";
  }
});

// Réécrire le fichier JSON
fs.writeFileSync(jsonFile, JSON.stringify(data, null, 4));
console.log("✔ Nettoyage terminé: abilities vides supprimées et types dupliqués corrigés");
