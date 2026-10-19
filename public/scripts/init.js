document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('[data-nav]').forEach(btn => { // 'Previous date' and 'Next date' buttons
        btn.addEventListener('click', () => displayCards(btn.dataset.date));
    });

    
    document.getElementById('hero-btnGen').addEventListener('click', () => { // 'Search' button
        displayCards(document.getElementById('hero-date').value)
    })
    document.getElementById('hero-btnRandom').addEventListener('click', handleRandom); // 'Random' button
})