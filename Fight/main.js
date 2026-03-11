const fs = require('fs');

const content = fs.readFileSync('TrainerData.txt', 'utf-8');
const trainerBlocks = content.trim().split(/\n(?=\[\d+\])/);
const trainers = [];

for (const block of trainerBlocks) {
  const lines = block.split('\n').map(l => l.replace('\r', '').trim()).filter((l, i) => i === 0 || l !== '');
  
  const headerMatch = lines[0].match(/\[(\d+)\]\s+(.+?):\s*$/);
  if (!headerMatch) continue;

  const id = parseInt(headerMatch[1]);
  const fullName = headerMatch[2].trim();
  const parts = fullName.rsplit ? fullName.rsplit(' ', 1) : fullName.split(/\s+(?=\S+$)/);
  const trainerClass = parts[0];
  const trainerName = parts[1] || '';

  const pokemonList = [];
  let current = null;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) {
      if (current) { pokemonList.push(current); current = null; }
      continue;
    }

    if (line.startsWith('- ')) {
      if (current) current.moves.push(line.slice(2));
    } else if (line.startsWith('Ability:')) {
      if (current) current.ability = line.replace('Ability:', '').trim();
    } else if (line.startsWith('Level:')) {
      if (current) current.level = parseInt(line.replace('Level:', '').trim());
    } else if (line.match(/^\w+ Nature$/)) {
      if (current) current.nature = line.replace(' Nature', '');
    } else if (line.startsWith('IVs:')) {
      if (current) {
        const vals = line.replace('IVs:', '').trim().split('/').map(v => parseInt(v.trim()));
        current.ivs = { hp: vals[0], atk: vals[1], def: vals[2], spa: vals[3], spd: vals[4], spe: vals[5] };
      }
    } else {
      if (current) pokemonList.push(current);
      const itemMatch = line.match(/^(.+)\s+@\s+(.+)$/);
      current = itemMatch
        ? { name: itemMatch[1].trim(), item: itemMatch[2].trim(), moves: [] }
        : { name: line, moves: [] };
    }
  }
  if (current) pokemonList.push(current);

  trainers.push({ id, class: trainerClass, name: trainerName, fullName, pokemon: pokemonList });
}

fs.writeFileSync('TrainerData.json', JSON.stringify(trainers, null, 2), 'utf-8');
console.log(`✅ ${trainers.length} trainers convertis.`);