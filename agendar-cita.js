document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    const totalSteps = 5;
    let appointmentData = {
        specialty: '',
        specialtyName: '',
        doctor: null,
        date: '',
        time: '',
        patient: {}
    };

    const doctorsDatabase = {
        'odontologia-adultos': [
            { id: 1, name: 'Dr. Carlos Mendoza', specialty: 'Odontólogo', experience: '15 años' },
            { id: 2, name: 'Dra. María González', specialty: 'Periodoncista', experience: '12 años' },
            { id: 3, name: 'Dr. Roberto Sánchez', specialty: 'Endodoncista', experience: '10 años' }
        ],
        'odontologia-ninos': [
            { id: 4, name: 'Dra. Patricia Valenzuela', specialty: 'Odontopediatra', experience: '18 años' },
            { id: 5, name: 'Dra. Andrea Rojas', specialty: 'Odontopediatra', experience: '8 años' }
        ],
        'medicina-general': [
            { id: 6, name: 'Dr. Juan Pablo Martínez', specialty: 'Médico General', experience: '20 años' },
            { id: 7, name: 'Dra. Claudia Fernández', specialty: 'Médico Internista', experience: '14 años' }
        ],
        'kinesiologia': [
            { id: 8, name: 'Lic. Sebastián Torres', specialty: 'Kinesiólogo', experience: '10 años' },
            { id: 9, name: 'Lic. Valentina Cortés', specialty: 'Kinesióloga', experience: '7 años' }
        ],
        'psicologia': [
            { id: 10, name: 'Ps. Rodrigo Vargas', specialty: 'Psicólogo Clínico', experience: '12 años' },
            { id: 11, name: 'Ps. Carolina Espinoza', specialty: 'Psicóloga Familiar', experience: '9 años' }
        ],
        'nutricion': [
            { id: 12, name: 'Nut. Daniela Morales', specialty: 'Nutricionista', experience: '8 años' },
            { id: 13, name: 'Nut. Felipe Ramírez', specialty: 'Nutricionista Deportivo', experience: '6 años' }
        ],
        'traumatologia': [
            { id: 14, name: 'Dr. Andrés Bustos', specialty: 'Traumatólogo', experience: '16 años' },
            { id: 15, name: 'Dr. Esteban Parra', specialty: 'Traumatólogo Deportivo', experience: '11 años' }
        ],
        'medicina-laboral': [
            { id: 16, name: 'Dr. Luis Herrera', specialty: 'Médico Laboral', experience: '13 años' }
        ]
    };

    // SELECCIONAR ESPECIALIDAD
    document.querySelectorAll('.specialty-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.specialty-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            appointmentData.specialty = this.dataset.specialty;
            appointmentData.specialtyName = this.querySelector('h4').textContent;
        });
    });

    // MOSTRAR DOCTORES
    function showDoctors() {
        const container = document.getElementById('doctorSelection');
        const doctors = doctorsDatabase[appointmentData.specialty] || [];
        
        if (doctors.length === 0) {
            container.innerHTML = '<p>No hay doctores</p>';
            return;
        }
        
        let html = '';
        doctors.forEach(doctor => {
            html += `
                <div class="doctor-card" style="cursor: pointer;" onclick="selectDoctorFunc(${doctor.id}, '${doctor.name}', '${doctor.specialty}')">
                    <div class="doctor-photo">👨‍⚕️</div>
                    <div class="doctor-info">
                        <h4>${doctor.name}</h4>
                        <span class="specialty-badge">${doctor.specialty}</span>
                        <p>${doctor.experience}</p>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    // SELECCIONAR DOCTOR
    window.selectDoctorFunc = function(id, name, specialty) {
        appointmentData.doctor = { id, name, specialty };
        document.querySelectorAll('.doctor-card').forEach(card => card.classList.remove('selected'));
        event.currentTarget.classList.add('selected');
    };

    // CARGAR HORARIOS
    function loadTimeSlots() {
        const container = document.getElementById('timeSlots');
        const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
        let html = '';
        times.forEach(time => {
            html += `<div class="time-slot" onclick="selectTimeFunc('${time}', this)">${time}</div>`;
        });
        container.innerHTML = html;
    }

    window.selectTimeFunc = function(time, elem) {
        appointmentData.time = time;
        document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
        elem.classList.add('selected');
    };

    // SIGUIENTE PASO
    document.getElementById('nextBtn').addEventListener('click', function() {
        if (currentStep === 1) {
            if (!appointmentData.specialty) {
                alert('Seleccione una especialidad');
                return;
            }
        }
        if (currentStep === 2) {
            if (!appointmentData.doctor) {
                alert('Seleccione un doctor');
                return;
            }
        }
        if (currentStep === 3) {
            const date = document.getElementById('appointmentDate').value;
            if (!date || !appointmentData.time) {
                alert('Seleccione fecha y hora');
                return;
            }
            appointmentData.date = date;
        }
        if (currentStep === 4) {
            const name = document.getElementById('patientName').value;
            if (!name) {
                alert('Ingrese nombre');
                return;
            }
            appointmentData.patient = {
                name: name,
                rut: document.getElementById('patientRut').value,
                email: document.getElementById('patientEmail').value,
                phone: document.getElementById('patientPhone').value,
                birthdate: document.getElementById('patientBirthdate').value,
                gender: document.getElementById('patientGender').value,
                notes: document.getElementById('patientNotes').value
            };
            showSummary();
        }

        if (currentStep === 1) {
            showDoctors();
        }
        if (currentStep === 2) {
            loadTimeSlots();
        }

        if (currentStep < totalSteps) {
            currentStep++;
            updateDisplay();
        }
    });

    // PASO ANTERIOR
    document.getElementById('prevBtn').addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            updateDisplay();
        }
    });

    // ACTUALIZAR PANTALLA
    function updateDisplay() {
        document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');

        document.querySelectorAll('.progress-step').forEach((step, index) => {
            const num = index + 1;
            step.classList.remove('active', 'completed');
            if (num < currentStep) step.classList.add('completed');
            if (num === currentStep) step.classList.add('active');
        });

        document.querySelectorAll('.progress-line').forEach((line, index) => {
            if (index < currentStep - 1) line.classList.add('completed');
            else line.classList.remove('completed');
        });

        document.getElementById('prevBtn').style.display = currentStep > 1 ? 'block' : 'none';
        document.getElementById('nextBtn').style.display = currentStep < totalSteps ? 'block' : 'none';
        document.getElementById('submitBtn').style.display = currentStep === totalSteps ? 'block' : 'none';

        window.scrollTo(0, 0);
    }

    // MOSTRAR RESUMEN
    function showSummary() {
        const container = document.getElementById('appointmentSummary');
        container.innerHTML = `
            <div class="summary-section">
                <h4>📋 Especialidad</h4>
                <p><strong>${appointmentData.specialtyName}</strong></p>
            </div>
            <div class="summary-section">
                <h4>👨‍⚕️ Profesional</h4>
                <p><strong>${appointmentData.doctor.name}</strong></p>
                <p>${appointmentData.doctor.specialty}</p>
            </div>
            <div class="summary-section">
                <h4>📅 Fecha y Hora</h4>
                <p><strong>${appointmentData.date}</strong></p>
                <p><strong>${appointmentData.time}</strong></p>
            </div>
            <div class="summary-section">
                <h4>👤 Paciente</h4>
                <p><strong>${appointmentData.patient.name}</strong></p>
                <p>${appointmentData.patient.email}</p>
            </div>
        `;
    }

    // ENVIAR CITA
    document.getElementById('appointmentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const num = 'CC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const voucher = `
            <div class="voucher">
                <div class="voucher-header">
                    <h2>✅ ¡CITA CONFIRMADA!</h2>
                    <p>Número: ${num}</p>
                </div>
                <div class="voucher-details">
                    <p><strong>Especialidad:</strong> ${appointmentData.specialtyName}</p>
                    <p><strong>Profesional:</strong> ${appointmentData.doctor.name}</p>
                    <p><strong>Fecha:</strong> ${appointmentData.date}</p>
                    <p><strong>Hora:</strong> ${appointmentData.time}</p>
                    <p><strong>Paciente:</strong> ${appointmentData.patient.name}</p>
                </div>
            </div>
        `;
        document.getElementById('voucherContainer').innerHTML = voucher;
        document.getElementById('voucherModal').classList.add('active');
    });

    function closeVoucherModal() {
        document.getElementById('voucherModal').classList.remove('active');
    }

    window.closeVoucherModal = closeVoucherModal;
    window.printVoucher = function() { window.print(); };
    window.downloadVoucher = function() { alert('Descargar PDF'); };

    // FECHA MÍNIMA
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').setAttribute('min', today);

    updateDisplay();
});
