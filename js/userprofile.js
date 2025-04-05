document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.nav-btn');
    
    const sections = document.querySelectorAll('.profile-section');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Button clicked:", button);

            const targetSection = document.getElementById(button.getAttribute('data-target'));
            console.log("Target Section:", targetSection);

            sections.forEach(section => {
                section.style.display = 'none';
            });

            targetSection.style.display = 'block';
        });
    });
});