// Use LocalStorage instead of a fake API URL
let students = JSON.parse(localStorage.getItem('aurora_students')) || [];

function saveToLocal() {
    localStorage.setItem('aurora_students', JSON.stringify(students));
}

function showHome() {
    document.getElementById('list-section').style.display = 'block';
    document.getElementById('form-section').style.display = 'none';
    renderGrid();
}

function showForm(studentId = null) {
    document.getElementById('list-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';
    const form = document.getElementById('student-form');
    
    if (studentId) {
        const student = students.find(s => s.id === studentId);
        document.getElementById('form-title').innerText = 'Update Profile';
        document.getElementById('db_id').value = student.id;
        document.getElementById('student_id').value = student.student_id;
        document.getElementById('full_name').value = student.full_name;
        document.getElementById('course').value = student.course;
        document.getElementById('year_level').value = student.year_level;
        document.getElementById('email').value = student.email;
    } else {
        document.getElementById('form-title').innerText = 'Student Registration';
        form.reset();
        document.getElementById('db_id').value = '';
    }
}

function renderGrid() {
    const grid = document.getElementById('student-grid');
    grid.innerHTML = '';
    
    students.forEach(student => {
        const initials = student.full_name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
        grid.innerHTML += `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="student-card shadow-sm h-100">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="avatar-circle">${initials}</div>
                        <div class="dropdown">
                            <button class="btn btn-sm" type="button" data-bs-toggle="dropdown">
                                <i class="bi bi-three-dots"></i>
                            </button>
                            <ul class="dropdown-menu shadow border-0 rounded-4">
                                <li><a class="dropdown-item py-2" href="#" onclick="showForm(${student.id})">Edit Student</a></li>
                                <li><a class="dropdown-item py-2 text-danger" href="#" onclick="deleteStudent(${student.id})">Remove Record</a></li>
                            </ul>
                        </div>
                    </div>
                    <span class="badge-course">${student.course}</span>
                    <h5 class="fw-bold mb-1">${student.full_name}</h5>
                    <p class="text-muted small mb-3">${student.student_id} • ${student.year_level}</p>
                    <div class="pt-3 border-top d-flex align-items-center gap-2">
                        <i class="bi bi-envelope text-muted"></i>
                        <span class="small text-muted text-truncate">${student.email}</span>
                    </div>
                </div>
            </div>`;
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('db_id').value;
    const studentData = {
        id: id ? parseInt(id) : Date.now(),
        student_id: document.getElementById('student_id').value,
        full_name: document.getElementById('full_name').value,
        course: document.getElementById('course').value,
        year_level: document.getElementById('year_level').value,
        email: document.getElementById('email').value
    };

    if (id) {
        const index = students.findIndex(s => s.id === parseInt(id));
        students[index] = studentData;
    } else {
        students.push(studentData);
    }

    saveToLocal();
    showHome();
}

function deleteStudent(id) {
    if (confirm("Delete this student?")) {
        students = students.filter(s => s.id !== id);
        saveToLocal();
        renderGrid();
    }
}

// Initial Load
renderGrid();
