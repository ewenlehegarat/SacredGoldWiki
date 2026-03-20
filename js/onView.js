export function onView() {
    const observed = document.querySelector('nav, .divs');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("view");
            }
        });
    }, {});

    observed.forEach(el => observer.observe(el));
}