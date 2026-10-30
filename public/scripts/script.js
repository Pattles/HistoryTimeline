// Formatting dates into readable ones
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const day = date.getDate();

    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
        day === 2 || day === 22 ? 'nd' :
        day === 3 || day === 23 ? 'rd' : 'th';

    return `${month} ${day}${suffix} ${year}`;
};


/**
 * Draws the event cards, updates the heading, 
 * Previous Date and Next Date buttons for a specific date.
 * @param {string} isoDate - a date in YYYY-MM-DD format
 */
function displayCards(isoDate) {
    const cardsContainer = document.getElementById('section-events__cards');
    
    // Clearing everything first under the div
    document.getElementById('section-events__cards').innerHTML = '';

    // Getting all relevant events for selected date
    const results = allEvents.filter(event => event.date === isoDate);

    // Changing headline -> What happened on [date]? – if no date/invalid date entered, default to random date
    document.getElementById('section-events__lead').innerHTML = `${formatDate(isoDate || new Date().toISOString().split('T')[0])}`;

    if (isoDate) {
        document.getElementById('hero-date').value = isoDate;
        populatePrevNextBtns(isoDate);
    }

    // If no events ARE NOT found or date is null/undefined
    if (results.length === 0 || !isoDate) {
        // Create a bogus card
        const card = document.createElement('div');
        card.classList.add('section-events__card');
        card.innerHTML = `
            <div class="section-events__dot"></div>
            <h4 class="section-events__headline">Nothing happened!</h4>
            <p class="section-events__desc">Just kidding, I haven\'t added anything for this date yet.</p>
            <a class="section-events__desc" href="https://www.pserikov.com/portfolio/history-timeline">Read more</a>
        `;
        cardsContainer.appendChild(card); 

    // If events ARE found
    } else {
        // Creating a new card for each event
        results.forEach(event => {
            const card = document.createElement('div');
            card.classList.add('section-events__card');
            card.innerHTML = `
                <div class="section-events__dot"></div>
                <h4 class="section-events__headline">${event.title}</h4>
                <p class="section-events__desc">${event.desc}</p>
                <a class="section-events__desc" href="${event.link}" target="_blank">Read more</a>
            `;
            cardsContainer.appendChild(card);
        })
    }
}

// # Generating random date
function handleRandom() {
    // Clearing everything first under the div
    document.getElementById('section-events__cards').innerHTML = '';

    const cardsContainer = document.getElementById('section-events__cards');

    // Getting a random date
    const allDates = allEvents.map(event => event.date);
    const randomDate = allDates[Math.floor(Math.random() * allDates.length)];

    // Changing headline -> May 1 2026 – if no date/invalid date entered, default to today's date
    document.getElementById('section-events__lead').innerHTML = `${formatDate(randomDate)}`; 

    // Populates 'previous date' and 'next date' buttons with text
    populatePrevNextBtns(randomDate);

    // Populates date input with target random date
    document.getElementById('hero-date').value = randomDate;

    const results = allEvents.filter(event => event.date === randomDate);

    // Creating a new card for each event
    results.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('section-events__card');
        card.innerHTML = `
            <div class="section-events__dot"></div>
            <h4 class="section-events__headline">${event.title}</h4>
            <p class="section-events__desc">${event.desc}</p>
            <a class="section-events__desc" href="${event.link}" target="_blank">Read more</a>
        `;
        cardsContainer.appendChild(card);
    });


}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    // Changing the headline to today's date
    document.getElementById('section-events__lead').innerHTML = `SAMPLE - ${formatDate(new Date().toISOString().split('T')[0])}`;


    document.getElementById('hero-btnRandom').addEventListener('click', handleRandom);
});