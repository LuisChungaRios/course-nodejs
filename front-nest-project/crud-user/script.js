const API = 'http://localhost:3000/api/v1/users';

const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('last_name');
const bornDateInput = document.getElementById('born_date');
const documentTypeInput = document.getElementById('document_type');
const documentNumberInput = document.getElementById('document_number');
const isActiveInput = document.getElementById('is_active');
const usersList = document.getElementById('usersList');
const formMsg = document.getElementById('formMsg');
const resetBtn = document.getElementById('resetBtn');
const searchInput = document.getElementById('search');

async function fetchUsers() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
}

function renderUsers(users) {
  usersList.innerHTML = '';
  if (!users.length) {
    usersList.innerHTML = `<div class="text-gray-500">No hay usuarios.</div>`;
    return;
  }

  users.forEach(u => {
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between border p-3 rounded';
    div.innerHTML = `
      <div>
        <div class="font-medium">${u.name} ${u.last_name} ${u.is_active ? '' : ' (inactivo)'}</div>
        <div class="text-sm text-gray-600">Documento: ${u.document_type} - ${u.document_number}</div>
        <div class="text-sm text-gray-600">Nac: ${new Date(u.born_date).toLocaleDateString()}</div>
      </div>
      <div class="flex gap-2">
        <button data-id="${u._id}" class="editBtn bg-yellow-400 px-3 py-1 rounded">Editar</button>
        <button data-id="${u._id}" class="deleteBtn bg-red-500 text-white px-3 py-1 rounded">Borrar</button>
      </div>
    `;
    usersList.appendChild(div);
  });

  // attach events
  document.querySelectorAll('.editBtn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      const res = await fetch(`${API}/${id}`);
      const user = await res.json();
      populateForm(user);
    });
  });

  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      if (!confirm('¿Eliminar usuario?')) return;
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      await loadAndRender();
    });
  });
}

function populateForm(user) {
  userIdInput.value = user._id;
  nameInput.value = user.name;
  lastNameInput.value = user.last_name;
  bornDateInput.value = new Date(user.born_date).toISOString().split('T')[0];
  documentTypeInput.value = user.document_type;
  documentNumberInput.value = user.document_number;
  isActiveInput.checked = !!user.is_active;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  userIdInput.value = '';
  nameInput.value = '';
  lastNameInput.value = '';
  bornDateInput.value = '';
  documentTypeInput.value = 'DNI';
  documentNumberInput.value = '';
  isActiveInput.checked = true;
  formMsg.innerText = '';
}

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formMsg.innerText = '';

  const payload = {
    name: nameInput.value.trim(),
    last_name: lastNameInput.value.trim(),
    born_date: bornDateInput.value,
    document_type: documentTypeInput.value,
    document_number: documentNumberInput.value.trim(),
    is_active: isActiveInput.checked,
  };

  // basic front validation
  if (!payload.name || !payload.last_name || !payload.born_date || !payload.document_number) {
    formMsg.innerText = 'Completa los campos obligatorios.';
    return;
  }

  try {
    if (userIdInput.value) {
      // update
      await fetch(`${API}/${userIdInput.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      // create
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    resetForm();
    await loadAndRender();
  } catch (err) {
    formMsg.innerText = 'Error en la petición.';
  }
});

resetBtn.addEventListener('click', resetForm);

searchInput.addEventListener('input', async (e) => {
  const q = e.target.value.toLowerCase();
  const all = await fetchUsers();
  const filtered = all.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.last_name.toLowerCase().includes(q) ||
    u.document_number.toLowerCase().includes(q)
  );
  renderUsers(filtered);
});

async function loadAndRender() {
  const users = await fetchUsers();
  renderUsers(users);
}

window.addEventListener('load', loadAndRender);
