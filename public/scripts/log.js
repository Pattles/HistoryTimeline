// Declaring important stuff
const labels = { add: 'Add event', edit: 'Edit event', delete: 'Delete event'};

// Handles closing an overlay via 'cancel' button
function closeOverlay(overlayObj, noteContent='') {
    const overlayClose = overlayObj.querySelector('.overlay-actions__cancel');

    overlayClose.addEventListener('click', () => {
        overlayObj.style.display = 'none';
        document.body.style.overflow = '';

        if ( noteContent != '' ) {
            const noteObj = overlayObj.querySelector('.overlay-form__note');
            noteObj.innerHTML = noteContent
        };
    })
}

// Handles adding Event to db
async function addEvent(date, title, desc, link, password) {
    if (!title || !desc) {
        console.log('Missing title or description.');
        return;
    };
    
    const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-admin-password': password
        },
        body: JSON.stringify({ date, title, desc, link })
    });

    return response.ok;
}

// Handles editing an Event
async function editEvent(eventID, date, title, desc, link, password) {
    if (!eventID || !date || !title || !desc) {
        console.log('Missing event, date, title, or description.');
        return false;
    }

    const response = await fetch(`/api/events/${eventID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password
        },
        body: JSON.stringify({ date, title, desc, link })
    });

    return response.ok;
}

// Responsible for opening/closing the gate overlay
document.addEventListener('DOMContentLoaded', () => {    
    const gateOverlay = document.getElementById('overlay-gate');
    const gateOpen = document.getElementById('gate-open') // 'Button' on the bottom that opens the gate

    // Opening the overlay
    gateOpen.addEventListener('click', () => {
        gateOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    })

    // Closing the overlay via 'cancel' button
    closeOverlay(
        gateOverlay, 
        '&nbsp;',
    )
});

// Clears contribute form values
function clearContribute() {
    document.getElementById('contribute-date').value = '';
    document.getElementById('contribute-title').value = '';
    document.getElementById('contribute-desc').value = '';
    document.getElementById('contribute-link').value = '';
    return
}

// Responsible for closing contribute overlay via 'cancel' button
document.addEventListener('DOMContentLoaded', () => {    
    const contributeOverlay = document.getElementById('overlay-contribute');

    // Closing the overlay via 'cancel' button
    closeOverlay(
        contributeOverlay,
    );
    clearContribute();
});

// Handling contribute overlay
document.addEventListener('DOMContentLoaded', () => {
    const gateOverlay = document.getElementById('overlay-gate');
    
    const gateContinue = gateOverlay.querySelector('.overlay-actions__continue');
    const gatePass = document.getElementById('gate-pass');

    // Sending auth API request
    gateContinue.addEventListener('click', async () => {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: gatePass.value })
        });

        if (response.ok) {
            // Correct password; auth passed
            // Closing gate overlay
            closeOverlay(
                gateOverlay,
            )

            // Opening log overlay
            const contributeOverlay = document.getElementById('overlay-contribute');
            contributeOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Closing gate overlay
            gateOverlay.style.display = 'none';


            const submitBtn = document.getElementById('contribute-submit');

            submitBtn.addEventListener('click', async () => {
                // Getting form values
                const eventID = document.getElementById('event-select').value; 
                const formDate = document.getElementById('contribute-date').value;
                const formTitle = document.getElementById('contribute-title').value;
                const formDesc = document.getElementById('contribute-desc').value;
                const formLink = document.getElementById('contribute-link').value;

                // Determining if an event is being added, edited, or deleted (not implemented)
                const modeSelect = document.getElementById('mode-select');
                
                switch (modeSelect.value) {
                    case 'add':
                        // Adding an event to db
                        await addEvent(formDate, formTitle, formDesc, formLink, gatePass.value);
                        break;

                    case 'edit':
                        // Editing an event in db
                           console.log(gatePass, typeof gatePass.value);
                        await editEvent(eventID, formDate, formTitle, formDesc, formLink, gatePass.value);
                        break;

                    default:
                        console.log('mode not implemented:', modeSelect.value);
                        break;
                }
                
                // Closing contribute overlay
                contributeOverlay.style.display = 'none';
                clearContribute();

                // Force reloading the page
                // location.reload();
                return
            })

        } else if (response.status === 401) {
            // Incorrect password; auth failed
            const note = gateOverlay.querySelector('.overlay-form__note');
            note.innerHTML = 'Incorrect password. Please try again.'
        }
    })

});


// Handles switching between add, edit, delete modes in overlay-contribute
function switchMode(mode) {
    document.querySelectorAll('[data-show-in]').forEach(el => {
        el.hidden = !el.dataset.showIn.split('').includes(mode);
    });

    document.getElementById('contribute-submit').textContent = labels[mode];

    document.querySelectorAll('.overlay-form__field[data-show-in]').forEach(field => {
        field.hidden = !field.dataset.showIn.split(' ').includes(mode);
    });
};

// Handles switching overlay elements depending on selected mode
document.addEventListener('DOMContentLoaded', () => {
    const modeSelect = document.getElementById('mode-select');

    modeSelect.addEventListener('change', () => {
        switchMode(modeSelect.value);
    });
    switchMode(modeSelect.value); // sets initial state on load

});

// Fetches and populates selector for events when editing an event
eventsReady.then(events => {
    const picker = document.getElementById('event-select');

    const sortedEvents = [...events].sort((a, b) => 
        a.date.localeCompare(b.date) || a.title.localeCompare(b.title)
    )

    sortedEvents.forEach(event => {
        picker.add(new Option(`${event.date} - ${event.title}`, event._id));
    })
})

// Populates form fields during editing of an event
document.addEventListener('DOMContentLoaded', () => {
    const eventSelect = document.getElementById('event-select');

    eventSelect.addEventListener('change', () => {
        const capturedEvent = allEvents.filter(ev => ev._id === eventSelect.value)[0]

        console.log(eventSelect.value); 

        const fields = ['date', 'title', 'desc', 'link'];

        // Getting form values
        function fillForm(event = {}) {
            fields.forEach(key => {
                document.getElementById(`contribute-${key}`).value = event[key] ?? '';
            });
        };

        fillForm(capturedEvent);
    })
})