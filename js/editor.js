const templateBtns = document.querySelectorAll('.template-btn');

const editorDisplay = document.querySelector('.type-display');

const templateContent = {
    kickoff: "Project Kickoff Plan Template Content...",
    "progress-report": "Weekly Progress Report Template Content...",
    "task-breakdown": "Task Breakdown Sheet Template Content...",
    "stakeholder-analysis": "Stakeholder Analysis Template Content...",
    "meeting-summary": "Meeting Summary Template Content...",
    "risk-assessment": "Risk Assessment Report Template Content...",
    "budget-planning": "Budget Planning Template Content...",
    "team-assignment": "Team Assignment Tracker Template Content...",
    "marketing-strategy": "Marketing Strategy Outline Template Content...",
    "content-calendar": "Content Calendar Template Content...",
    "client-feedback": "Client Feedback Form Template Content...",
    "performance-review": "Performance Review Template Content...",
    "annual-report": "Annual Report Summary Template Content...",
    "onboarding-checklist": "Employee Onboarding Checklist Template Content...",
    "competitive-analysis": "Competitive Analysis Template Content...",
    "product-launch": "Product Launch Plan Template Content...",
    "quality-checklist": "Quality Assurance Checklist Template Content...",
    "expense-report": "Expense Report Template Content...",
    "training-outline": "Training Session Outline Template Content...",
    "milestone-tracker": "Milestone Tracker Template Content..."
};

templateBtns.forEach(button => {
    button.addEventListener('click', function() {
        const templateName = button.getAttribute('data-template');
        
        editorDisplay.innerHTML = `<p>${templateContent[templateName]}</p>`;
    });
});