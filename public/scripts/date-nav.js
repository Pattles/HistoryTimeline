// Populate 'Previous date' data-label with the nearest available date
document.addEventListener('DOMContentLoaded', () => {
    eventsReady.then(() => {
        const prevDate = getPrevNextDates(new Date().toISOString().split('T')[0])[0];
        document.querySelector('[data-nav="prev"]').dataset.date = prevDate;  
    })
})

function sortedEvents() {
    return [...allEvents].sort((a, b) =>
        a.date.localeCompare(b.date) || a.title.localeCompare(b.title)
    );
}


function getEventDates() {
    const dates = allEvents.map(event => event.date);   // 1. a new array holding every date
    const unique = [...new Set(dates)].sort();          // 2. remove duplicates & sort
    return unique;
}
    
// Previous & next date
function getPrevNextDates(currentDate) {
    const allDates = [...new Set([...getEventDates(), currentDate])].sort();   
    const currentDateIndex = allDates.indexOf(currentDate);
        
    const prevDate = allDates[currentDateIndex-1]; 
    const nextDate = allDates[currentDateIndex+1];

    return [prevDate, nextDate];
}

/**
 * Populates 'Previous date' and 'Next date' buttons with text
 * @param {*} isoDate - a date in YYYY-MM-DD format
 */
function populatePrevNextBtns(isoDate) {
    const prevBtn = document.querySelector('[data-nav="prev"]');
    const nextBtn = document.querySelector('[data-nav="next"]'); 

    const [prevDate, nextDate] = getPrevNextDates(isoDate);   // must return [prev, next]

    prevBtn.hidden = !prevDate;
    nextBtn.hidden = !nextDate;

    if (prevDate) {
        prevBtn.textContent = formatDate(prevDate);
        prevBtn.dataset.date = prevDate;
    }
    if (nextDate) {
        nextBtn.textContent = formatDate(nextDate);
        nextBtn.dataset.date = nextDate;
    }
}

