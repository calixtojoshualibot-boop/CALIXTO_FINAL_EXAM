let students = JSON.parse(localStorage.getItem('aurora_db')) || [];

function showHome() {
    document.getElementById('list-section').style.display = 'block';
    document.getElementById('form-section').style.display = 'none';
    renderGrid();
}

function showForm(id = null) {
    document.getElementById('list-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
    const form = document.getElementById('student-form');
    if (id) {
        const s = students.find(x => x.id === id);
        document.getElementById('form-title').innerText = 'Update Student';
        document.getElementById('db_id').value = s.id;
        document.getElementById('student_id').value = s.student_id;
        document.getElementById('full_name').value = s.full_name;
        document.getElementById('course').value = s.course;
        document.getElementById('year_level').value = s.year_level;
        document.getElementById('email').value = s.email;
    } else {
        document.getElementById('form-title').innerText = 'New Registration';
        form.reset();
        document.getElementById('db_id').value = '';
    }
}

function renderGrid() {
    const grid = document.getElementById('student-grid');
    grid.innerHTML = '';
    students.forEach(s => {
        const initials = s.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
        grid.innerHTML += `
            <div class="col-md-4">
                <div class="student-card shadow-sm">
                    <div class="d-flex justify-content-between">
                        <div class="avatar-circle">${initials}</div>
                        <div class="dropdown">
                            <button class="btn btn-sm" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" onclick="showForm(${s.id})">Edit</a></li>
                                <li><a class="dropdown-item text-danger" onclick="deleteStudent(${s.id})">Delete</a></li>
                            </ul>
                        </div>
                    </div>
                    <span class="badge-course">${s.course}</span>
                    <h5 class="fw-bold mt-2">${s.full_name}</h5>
                    <p class="text-muted small">${s.student_id} • ${s.year_level}</p>
                </div>
            </div>`;
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('db_id').value;
    const data = {
        id: id ? parseInt(id) : Date.now(),
        student_id: document.getElementById('student_id').value,
        full_name: document.getElementById('full_name').value,
        course: document.getElementById('course').value,
        year_level: document.getElementById('year_level').value,
        email: document.getElementById('email').value
    };

    if (id) {
        const idx = students.findIndex(x => x.id === parseInt(id));
        students[idx] = data;
    } else {
        students.push(data);
    }
    localStorage.setItem('aurora_db', JSON.stringify(students));
    showHome();
}

function deleteStudent(id) {
    if (confirm("Delete record?")) {
        students = students.filter(x => x.id !== id);
        localStorage.setItem('aurora_db', JSON.stringify(students));
        renderGrid();
    }
}

renderGrid();
