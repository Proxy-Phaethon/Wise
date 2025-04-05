// update form thingy
document.addEventListener("DOMContentLoaded", function () {
    let dailyUpdates = document.querySelector(".daily-updates");
    let updateForm = document.querySelector(".new-update form");

    if (!dailyUpdates) {
        console.error("ERROR: '.daily-updates' not found!");
        return;
    }

    updateForm.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("Form submitted!");

        let titleInput = document.querySelector("#title").value.trim();
        let authorInput = document.querySelector("#author").value.trim();
        let descriptionInput = document.querySelector("#description").value.trim();

        if (!titleInput || !authorInput || !descriptionInput) {
            alert("All fields are required!");
            return;
        }

        let updateBox = document.createElement("div");
        updateBox.classList.add("update-box");
        updateBox.innerHTML = `
            <h3>${titleInput}</h3>
            <p>By ${authorInput}</p>
            <p>${descriptionInput}</p>
        `;

        console.log("New update created:", updateBox);

        dailyUpdates.prepend(updateBox);

        let updates = dailyUpdates.querySelectorAll(".update-box");
        if (updates.length > 5) {
            updates[updates.length - 1].remove();
        }

        updateForm.reset();
    });
});