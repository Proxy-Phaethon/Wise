// for time
function updateTime () {
    const now = new Date ();
    const hours = now.getHours ().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    document.getElementById("timeDisplay").textContent = `${hours}:${minutes}:${seconds}`;
}

document.addEventListener("DOMContentLoaded", () => {
    updateTime();
    setInterval(updateTime, 1000);
});

// For date
function updateDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById("dateDisplay").textContent = dateString;
}

document.addEventListener("DOMContentLoaded", updateDate);

//for weather
async function updateWeather() {
    const apiKey = "0b30d4b1eac435b446ab794435f26f7d"; 
    const city = "London";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not found");
        
        const data = await response.json();
        const temp = Math.round(data.main.temp); 
        const condition = data.weather[0].main; 
        
        const weatherIcons = {
            Clear: "☀️",
            Clouds: "☁️",
            Rain: "🌧️",
            Thunderstorm: "⛈️",
            Snow: "❄️",
            Drizzle: "🌦️",
            Mist: "🌫️"
        };
        
        const icon = weatherIcons[condition] || "🌍"; 

        document.getElementById("weatherDisplay").textContent = `${icon} ${temp}°C`;
    } catch (error) {
        console.error("Weather fetch error:", error);
        document.getElementById("weatherDisplay").textContent = "❌ Error";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const weatherElement = document.getElementById("weatherDisplay");
    if (weatherElement) {
        updateWeather();
    } else {
        console.warn("⚠️ #weatherDisplay not found at DOMContentLoaded");
    }
});

//task stuff
document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("addTaskForm");
    const taskList = document.getElementById("taskList");
    const progressBar = document.getElementById("taskProgress");
    const taskTitle = document.getElementById("taskTitle");

    function loadTasks() {
        taskList.innerHTML = "";
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToUI(task.text, task.completed));
        updateProgress();
    }

    function addTaskToUI(taskText, completed = false) {
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.innerHTML = `
            <label>
                <input type="checkbox" class="task-checkbox" ${completed ? "checked" : ""}> 
                <span class="task-text">${taskText}</span>
            </label>
            <button class="delete-task">✖</button>
        `;
        
        taskList.appendChild(li);

        li.querySelector(".task-checkbox").addEventListener("change", updateProgress);
        li.querySelector(".delete-task").addEventListener("click", function () {
            li.remove();
            saveTasks();
        });
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const taskText = taskTitle.value.trim();
        if (taskText === "") return;

        addTaskToUI(taskText);
        saveTasks();
        taskTitle.value = "";
        updateProgress();
    });

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach((taskItem) => {
            const text = taskItem.querySelector(".task-text").textContent;
            const completed = taskItem.querySelector(".task-checkbox").checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateProgress() {
        const checkboxes = document.querySelectorAll(".task-checkbox");
        const checked = document.querySelectorAll(".task-checkbox:checked").length;
        const total = checkboxes.length;
        const progressPercentage = total > 0 ? (checked / total) * 100 : 0;

        progressBar.style.width = `${progressPercentage}%`;
        saveTasks();
    }

    loadTasks();
});

//avatar thingy
const expandAvatar = document.getElementById("expandAvatar");
const closeAvatar = document.getElementById("closeAvatar");
const expandedAvatar = document.getElementById("expandedAvatar");

expandAvatar.addEventListener("click", () => {
    expandedAvatar.style.display = "flex";
    document.body.style.overflow = "hidden";
});

closeAvatar.addEventListener("click", () => {
    expandedAvatar.style.display = "none";
    document.body.style.overflow = "auto";
});

// CHAT AAAAAAAAAAAAAAA
const chatbox = document.querySelector(".chatbox");
const expandedChatbox = document.querySelector(".chatbox-expanded");
const expandChatBtn = document.getElementById("expandChat");
const closeChatBtn = document.getElementById("closeChat");

const chatboxMessages = document.getElementById("chatboxMessages");
const expandedChatMessages = document.getElementById("expandedChatMessages");

const chatboxInput = document.getElementById("chatboxInput");
const expandedChatInput = document.getElementById("expandedChatInput");

const chatboxSend = document.getElementById("chatboxSend");
const expandedChatSend = document.getElementById("expandedChatSend");

function expandChatbox() {
    expandedChatbox.style.visibility = "visible";
    expandedChatbox.style.opacity = "1";
}

function closeChatbox() {
    expandedChatbox.style.visibility = "hidden";
    expandedChatbox.style.opacity = "0";
    chatbox.style.display = "flex";
}

function syncMessages() {
    expandedChatMessages.innerHTML = chatboxMessages.innerHTML;
}

function sendMessage(inputField) {
    let message = inputField.value.trim();
    if (message === "") return;

    addMessageToChat("user", message);
    saveMessage("user", message);

    setTimeout(() => {
        let botResponse = "Got it! (Bot reply for now)";
        addMessageToChat("other", botResponse);
        saveMessage("other", botResponse);
    }, 1000);

    inputField.value = "";
}

function addMessageToChat(sender, message) {
    let messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender);
    messageElement.textContent = message;

    chatboxMessages.appendChild(messageElement.cloneNode(true));
    expandedChatMessages.appendChild(messageElement);

    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    expandedChatMessages.scrollTop = expandedChatMessages.scrollHeight;
}

function saveMessage(sender, message) {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push({ sender, message });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

function loadMessages() {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.forEach(msg => addMessageToChat(msg.sender, msg.message));
}

document.addEventListener("DOMContentLoaded", loadMessages);

chatboxSend.addEventListener("click", () => sendMessage(chatboxInput));
expandedChatSend.addEventListener("click", () => sendMessage(expandedChatInput));

chatboxInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") sendMessage(chatboxInput);
});

expandedChatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") sendMessage(expandedChatInput);
});

expandChatBtn.addEventListener("click", expandChatbox);
closeChatBtn.addEventListener("click", closeChatbox);

//for updates box
document.addEventListener('DOMContentLoaded', () => {
    const dashboardList = document.querySelector('#updates-list');
    const updates = JSON.parse(localStorage.getItem('updates')) || [];
  
    dashboardList.innerHTML = '';
  
    updates.slice(0, 3).forEach((update, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="html/updates.html#update-${index + 1}">
          ${update.title}
        </a>
      `;
      dashboardList.appendChild(li);
    });
  });

  // Smooth scroll to updates when hash is clicked
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  });
  
  