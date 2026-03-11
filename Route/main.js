const searchInput = document.getElementById('searchInput') || document.querySelector('input[type="text"]');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase().replace('#', '');
    const routes = document.querySelectorAll('.divs');

    routes.forEach(route => {
      const routeName = route.querySelector('h2')?.textContent.toLowerCase() || '';
      route.style.display = !q || routeName.includes(q) ? '' : 'none';
    });
  });
}