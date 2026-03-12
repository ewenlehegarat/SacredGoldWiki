// ✅ Fonction d'ajustement individuel — chaque sprite s'ajuste dès son chargement
function adjustSprite(img) {
  const DESIRED_MAX = 250;
  const DESIRED_MIN = 80;
  const w = img.naturalWidth;
  if (w > 0) {
    img.style.width = Math.round(Math.max(DESIRED_MIN, Math.min(DESIRED_MAX, w * 2))) + 'px';
    img.style.height = 'auto';
  }
}
// — Sprite
const pokemonImg = document.querySelector('.pokemon_img');
// ✅ Ajustement immédiat dès le chargement — plus d'attente globale
if (pokemonImg.complete) {
  adjustSprite(pokemonImg);
} else {
  pokemonImg.addEventListener('load', () => adjustSprite(pokemonImg));
  pokemonImg.addEventListener('error', () => {});
}