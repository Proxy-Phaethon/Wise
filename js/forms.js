document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll(".nav-btn");
    const formSections = document.querySelectorAll(".form-section");

    navButtons.forEach(button => {
        button.addEventListener("click", function () {
            const target = button.getAttribute("data-target");

            formSections.forEach(section => {
                section.style.display = "none";
            });

            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });
});