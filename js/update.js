const modal = document.getElementById('update-modal');
const form = document.getElementById('update-form');
const newUpdateBtn = document.getElementById('new-update-button');
const cancelBtn = document.getElementById('cancel-update');
const updatesContainer = document.getElementById('updates-list');
const postList = document.getElementById('post-list');
const modalContent = document.querySelector('.modal-content');

let currentEditingIndex = null;

// Open modal
newUpdateBtn.addEventListener('click', () => {
  currentEditingIndex = null;
  form.reset();
  modal.classList.remove('hidden');
});

// Close modal on cancel
cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  form.reset();
  currentEditingIndex = null;
});

// Close modal on backdrop click
modal.addEventListener('click', (e) => {
  if (!modalContent.contains(e.target)) {
    modal.classList.add('hidden');
    form.reset();
    currentEditingIndex = null;
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    form.reset();
    currentEditingIndex = null;
  }
});

// Load updates from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  refreshDOM();
});

// Handle submit (add or edit)
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = form['title'].value.trim();
  const author = form['author'].value.trim();
  const description = form['description'].value.trim();

  if (!title || !author || !description) {
    alert('All fields are required!');
    return;
  }

  const updates = JSON.parse(localStorage.getItem('updates')) || [];

  const updateData = {
    title,
    author,
    description,
    timestamp: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    date: new Date().toLocaleDateString()
  };

  if (currentEditingIndex !== null) {
    updates[currentEditingIndex] = updateData;
  } else {
    updates.unshift(updateData);
    if (updates.length > 40) updates.pop();
  }

  localStorage.setItem('updates', JSON.stringify(updates));
  form.reset();
  modal.classList.add('hidden');
  currentEditingIndex = null;
  refreshDOM();
});

// Renders updates
function refreshDOM() {
  updatesContainer.innerHTML = '';
  postList.innerHTML = '';

  const updates = JSON.parse(localStorage.getItem('updates')) || [];

  updates.forEach((update, index) => {
    // Create update box
    const updateBox = document.createElement('div');
    updateBox.classList.add('update-box');
    updateBox.id = `update-${index + 1}`; // 🔗 Unique anchor for linking

    updateBox.innerHTML = `
      <h3 class="update-title">${update.title}</h3>
      <p class="update-author">By ${update.author}</p>
      <p class="update-timestamp">${update.timestamp}</p>
      <p class="update-description">${update.description.replace(/\n/g, '<br>')}</p>
      <button class="edit-update-button" data-index="${index}">Edit</button>
    `;
    updatesContainer.appendChild(updateBox);

    // Create post list item
    const postItem = document.createElement('li');
    postItem.classList.add('post-item');
    postItem.innerHTML = `
      <span class="post-date">${update.date}</span> - 
      <span class="post-author">${update.author}</span> - 
      <span class="post-title">${update.title}</span>
    `;
    postList.appendChild(postItem);

    // Edit button
    updateBox.querySelector('.edit-update-button').addEventListener('click', () => {
      currentEditingIndex = index;
      form['title'].value = update.title;
      form['author'].value = update.author;
      form['description'].value = update.description;
      modal.classList.remove('hidden');
    });
  });
}
