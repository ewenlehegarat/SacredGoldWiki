<template>
  <main>
    <h1>Welcome to Sacred Gold wiki</h1>
    <p>Here you'll find the <RouterLink to="/pokemonList">List of Pokémon</RouterLink>, the different <RouterLink to="/encounters">Encounters</RouterLink>, <RouterLink to="/fight">Fight</RouterLink>, and more ( <RouterLink to="/item">Important Item</RouterLink>, <RouterLink to="/event">Special Event</RouterLink> ), and the link to the official Fan Game <a href="https://drive.google.com/drive/u/1/folders/1oSurQpYjTCMBxC3G6g3vcxsqBjI04ILT" target="_blank">Documentation</a>. Enjoy!</p>
  </main>
</template>

<style scoped>
  main{
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 8px;
    
    h1{
      font-size: 2rem;
      color: var(--Black);
    }
    p{
      font-size: 0.9rem;
      margin-left: 16px;
    }
  }
  @media screen and (min-width: 768px){
    main{
      text-align: left;

      h1{
        font-size: 50px;
      }
      p{
        font-size: 20px;
      }
    }
  }
</style>