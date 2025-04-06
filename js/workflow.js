const addTeamBtn = document.getElementById("addTeamBtn");
const workflowGrid = document.getElementById("workflowGrid");
const teamModal = document.getElementById("teamModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const teamModalClose = document.getElementById("teamModalClose");
const modalTitle = document.getElementById("modalTitle");

const createModal = document.getElementById('createTeamModal');
const createForm = document.getElementById('createTeamForm');
const createClose = document.getElementById('createTeamClose');

const statuses = ["Active", "Idle", "Paused", "Complete"];
const statusIcons = ["🔥", "🕒", "⏸️", "✅"];

let teamCounter = 1;

// Load teams from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTeams = JSON.parse(localStorage.getItem("teams")) || [];
  savedTeams.forEach(team => renderTeamBox(team));
});

// Open create form
addTeamBtn.addEventListener("click", () => {
  createModal.classList.add("active");
  modalBackdrop.classList.add("active");
});

// Close form
createClose.addEventListener("click", () => {
  createModal.classList.remove("active");
  modalBackdrop.classList.remove("active");
  createForm.reset();
});

// Handle Create Team form submission
createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(createForm);
  const data = {
    id: Date.now(),
    title: formData.get("title"),
    lead: formData.get("lead"),
    project: formData.get("project"),
    members: formData.get("members").split(",").map(m => m.trim()).filter(Boolean),
    tags: formData.get("tags").split(",").map(t => t.trim()).filter(Boolean),
    progress: Number(formData.get("progress")) || 0,
    tasks: formData.get("tasks").split(",").map(t => t.trim()).filter(Boolean),
    updated: new Date().toLocaleDateString(),
    status: "Active"
  };

  renderTeamBox(data);
  saveTeamToStorage(data);

  createModal.classList.remove("active");
  modalBackdrop.classList.remove("active");
  createForm.reset();
});

// Render a team box in the grid
function renderTeamBox(data) {
  const box = document.createElement("div");
  box.className = "workflow-box";
  box.innerHTML = `
    <h3 class="team-name">${data.title}</h3>
    <div class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${data.progress}%;"></div>
      </div>
    </div>
    <div class="team-icons">
      ${data.members.map(m => `<span class="avatar">${m[0]}</span>`).join('')}
    </div>
  `;
  box.addEventListener("click", () => openModal(data));
  workflowGrid.appendChild(box);
}

// Save team data to localStorage
function saveTeamToStorage(team) {
  const teams = JSON.parse(localStorage.getItem("teams")) || [];
  teams.push(team);
  localStorage.setItem("teams", JSON.stringify(teams));
}

// Open team modal with data
function openModal(data) {
  modalTitle.textContent = data.title;
  // Extend here with full modal data population
  teamModal.classList.add("active");
  modalBackdrop.classList.add("active");
}

// Close modal
teamModalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

function closeModal() {
  teamModal.classList.remove("active");
  modalBackdrop.classList.remove("active");
}

// Cycle status inside modal
document.addEventListener("click", function (e) {
  if (e.target.closest(".status-cycle-btn")) {
    const btn = e.target.closest(".status-cycle-btn");
    const label = btn.querySelector(".status-label");
    const currentStatus = label.textContent.trim();
    let index = statuses.indexOf(currentStatus);
    index = (index + 1) % statuses.length;
    label.textContent = statuses[index];
    btn.innerHTML = `${statusIcons[index]} <span class="status-label">${statuses[index]}</span>`;
  }
});
