/* 
Archived model/overlay code
*/

// Handling opening the Addnew modal
function handleAddnewOpen() {
    const modalAddnew = document.getElementById('modal-addnew')

    // Making the popup visible on click
    modalAddnew.style.display = "flex";
};

// Handling closing the Addnew modal
function handleAddnewClose() {
    const modalAddnew = document.getElementById('modal-addnew')

    // Making the popup invisible on click
    modalAddnew.style.display = "none";
};

// Handling submitting content from Addnew modal with content
function handleAddnewSubmit() {
    // Getting event date & time
    const date = document.getElementById('input-addnewDate').value

    // Getting event content
    const title = document.getElementById('input-addnewTitle').value;
    const desc = document.getElementById('input-addnewDesc').value;
    const link = document.getElementById('input-addnewLink').value;

    fetch('/add-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({date, title, desc, link})
    }).then(() => {
        location.reload();
    });
};