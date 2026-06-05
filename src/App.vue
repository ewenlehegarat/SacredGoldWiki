<script setup>
  import Nav from './components/nav.vue'
</script>

<template>
  <Nav />
  <RouterView />
</template>

<style>
  main {
    padding: 150px 16px 32px 16px;

    h1 {
      font-size: 40px;
      margin-bottom: 8px;
      color: #fefdc7;
    }

    .image_1 {
      transform: scaleX(-1);
    }

    p:nth-child(2) {
      margin-bottom: 4px;
    }

    a {
      color: var(--Black);

      &:hover {
        color: var(--Blue);
      }
    }

    .divs {
      background-color: var(--White);
    }
  }

  @media screen and (min-width: 768px) {
    main {
      padding: 150px 32px 0 32px;
    }
  }
</style>