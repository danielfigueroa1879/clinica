/**
 * ============================================
 * SISTEMA DE AGENDAMIENTO DE CITAS - VERSIÓN ARREGLADA
 * Archivo: agendar-cita.js (FIXED)
 * ============================================
 */

// ===== BASE DE DATOS DE DOCTORES =====
const doctorsDatabase = {
    'odontologia-adultos': [
        {
            id: 'dr-001',
            name: 'Dr. Carlos Mendoza Rivera',
            specialty: 'Odontólogo General',
            experience: '15 años de experiencia',
            rating: '⭐⭐⭐⭐⭐',
            photo: '👨‍⚕️'
        },
        {
            id: 'dr-002',
            name: 'Dra. María Teresa González',
            specialty: 'Periodoncista',
            experience: '12 años de experiencia',
            rating: '⭐⭐⭐⭐⭐',
            photo: '👩‍⚕️'
        },
        {
            id: 'dr-003',
            name: 'Dr. Roberto Sánchez Muñoz',
            specialty: 'Endodoncista',
            experience: '10 años de experiencia',
            rating: '⭐⭐⭐⭐',
            photo: '👨‍⚕️'
        }
    ],
    'odontologia-ninos': [
        {
            id: 'dr-004',
            name: 'Dra. Patricia Valenzuela',
            specialty: 'Odontopediatra',
            experience: '18 años de experiencia',
            rating: '⭐⭐⭐⭐⭐',
            photo: '👩‍⚕️'
        },
        {
            id: 'dr-005',
            name: 'Dra. Andrea Rojas Castro',
            specialty: 'Odontopediatra',
            experience: '8 años de experiencia',
            rating: '⭐⭐⭐⭐⭐',
            photo: '👩‍⚕️'
        }
    ],
    'medicina-general': [
        {
            id: 'dr-006',
            name: 'Dr. Juan Pablo Martínez',
            specialty: 'Médico General',
            experience: '20 años de experiencia',
            rating: '⭐⭐⭐⭐⭐',
            photo: '👨‍⚕️'
        },
        {
            id: 'dr-007',
            name: 'Dra. Claudia Fernández',
            specialty: 'Médico Internista',
            experience: '14 años de experiencia',
            rating: '⭐⭐⭐⭐',
            photo: '👩‍⚕️'
        }
    ],
    'kinesiologia': [
        {
            id: 'dr-008',
            name: 'Lic. Sebastián Torres',
            specialty: 'Kinesiólogo Deportivo',
            experience: '10 años de experiencia',
            rating: '⭐⭐⭐⭐⭐',
            photo: '👨‍⚕️'
        },
        {
            id: 'dr-009',
            name: 'Lic. Valentina Cortés',
            specialty: 'Kinesióloga Rehabilitación',
            experience: '7 años de experiencia',
            rating: '⭐⭐⭐⭐',
            photo: '👩‍⚕️'
        }
    ],
    'psicologia': [
        {
            id: 'dr-010',
            name: 'Ps. Rodrigo Vargas Silva',
            specialty: 'Psicólogo Clínico',
            experience: '12 años de experiencia',
            rating: '⭐⭐⭐⭐⭐',
            photo: '👨‍⚕️'
        },
        {
            id: 'dr-011',
            name: 'Ps. Carolina Espinoza',
            specialty: 'Psicóloga Familiar',
            experience: '9 años de experiencia',
            rating: '⭐⭐⭐⭐',
            photo: '👩‍⚕️'
        }
    ],
    'nutricion': [
        {
            id: 'dr-012',
            name: 'Nut. Daniela Morales',
            specialty: 'Nutricionista Clínica',
            experience: '8 años de experiencia',
            rating: '⭐⭐⭐⭐⭐',
            photo: '👩‍⚕️'
        },
        {
            id: 'dr-013',
            name: 'Nut. Felipe Ramírez',
            specialty: 'Nutricionista Deportivo',
            experience: '6 años de experiencia',
            rating: '⭐⭐⭐⭐',
            photo: '👨‍⚕️'
        }
    ],
    'traumatologia': [
        {
            id: 'dr-014',
            name: 'Dr. Andrés Bustos Ríos',
            specialty: 'Traumatólogo',
            experience: '16 años de experiencia',
            rating: '⭐⭐⭐⭐⭐',
            photo: '👨‍⚕️'
        },
        {
            id: 'dr-015',
            name: 'Dr. Esteban Parra López',
            specialty: 'Traumatólogo Deportivo',
            experience: '11 años de experiencia',
            rating: '⭐⭐⭐⭐',
            photo: '👨‍⚕️'
        }
    ],
    'medicina-laboral': [
        {
            id: 'dr-016',
            name: 'Dr. Luis Herrera Campos',
            specialty: 'Médico Laboral',
            experience: '13 años de experiencia',
            rating: '⭐⭐⭐⭐',
            photo: '👨‍⚕️'
        }
    ]
};

// ===== HORARIOS DISPONIBLES =====
const availableTimeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
];

// ===== ESTADO DE LA CITA =====
let appointmentData = {
    specialty: '',
    specialtyName: '',
    doctor: null,
    date: '',
    time: '',
    patient: {}
};

let currentStep = 1;
const totalSteps = 5;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initAppointmentSystem();
});

function initAppointmentSystem() {
    console.log('✅ Sistema de agendamiento iniciado');
    
    // Event listeners para navegación
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', submitAppointment);
    }
    
    // Event listeners para selección de especialidad
    const specialtyOptions = document.querySelectorAll('.specialty-option');
    specialtyOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectSpecialty(this);
        });
    });
    
    // Event listener para fecha
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            loadTimeSlots(this.value);
        });
        
        // Configurar fecha mínima (hoy)
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Configurar fecha máxima (3 meses adelante)
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
    
    console.log('✅ Event listeners configurados correctamente');
}

// ===== SELECCIÓN DE ESPECIALIDAD =====
function selectSpecialty(element) {
    console.log('🏥 Especialidad seleccionada');
    
    // Remover selección anterior
    const allSpecialtyOptions = document.querySelectorAll('.specialty-option');
    allSpecialtyOptions.forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Seleccionar nueva especialidad
    element.classList.add('selected');
    appointmentData.specialty = element.dataset.specialty;
    appointmentData.specialtyName = element.querySelector('h4').textContent;
    
    console.log('✅ Especialidad:', appointmentData.specialtyName);
}

// ===== CARGAR DOCTORES - VERSIÓN ARREGLADA =====
function loadDoctors() {
    console.log('🏥 CARGANDO DOCTORES...');
    
    const doctorSelection = document.getElementById('doctorSelection');
    
    if (!doctorSelection) {
        console.error('❌ No se encontró el contenedor doctorSelection');
        return;
    }
    
    // Obtener doctores para la especialidad seleccionada
    const doctors = doctorsDatabase[appointmentData.specialty] || [];
    
    console.log(`📋 Total de doctores: ${doctors.length}`);
    
    if (doctors.length === 0) {
        doctorSelection.innerHTML = `
            <p style="text-align: center; padding: 3rem 2rem; grid-column: 1/-1; color: #666;">
                No hay doctores disponibles para esta especialidad.
            </p>
        `;
        return;
    }
    
    // Limpiar contenedor
    doctorSelection.innerHTML = '';
    
    // Crear HTML de doctores
    let doctorsHTML = '';
    doctors.forEach((doctor, index) => {
        doctorsHTML += `
            <div class="doctor-card" data-doctor-id="${doctor.id}" data-doctor-index="${index}" 
                 onclick="selectDoctor(${index}); return false;">
                <div class="doctor-photo">
                    ${doctor.photo}
                </div>
                <div class="doctor-info">
                    <h4>${doctor.name}</h4>
                    <span class="specialty-badge">${doctor.specialty}</span>
                    <p>📚 ${doctor.experience}</p>
                    <div class="doctor-rating">${doctor.rating}</div>
                </div>
            </div>
        `;
    });
    
    doctorSelection.innerHTML = doctorsHTML;
    
    console.log(`✅ ${doctors.length} doctores cargados en el DOM`);
    
    // Agregar event listeners a las tarjetas
    setTimeout(() => {
        const cards = doctorSelection.querySelectorAll('.doctor-card');
        console.log(`✅ Tarjetas encontradas: ${cards.length}`);
        
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.borderColor = '#3da672';
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 20px rgba(45, 134, 89, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.borderColor = '#e0e0e0';
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                }
            });
        });
    }, 100);
}

// ===== SELECCIONAR DOCTOR =====
function selectDoctor(index) {
    console.log(`👨‍⚕️ Seleccionando doctor en index ${index}`);
    
    const doctors = doctorsDatabase[appointmentData.specialty];
    
    if (!doctors || !doctors[index]) {
        console.error('❌ Doctor no encontrado');
        return;
    }
    
    const doctor = doctors[index];
    const doctorSelection = document.getElementById('doctorSelection');
    
    // Remover selección anterior
    const allCards = doctorSelection.querySelectorAll('.doctor-card');
    allCards.forEach(card => {
        card.classList.remove('selected');
        card.style.borderColor = '#e0e0e0';
        card.style.background = 'white';
        card.style.boxShadow = 'none';
    });
    
    // Seleccionar la tarjeta clickeada
    const selectedCard = doctorSelection.querySelector(`[data-doctor-index="${index}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        selectedCard.style.borderColor = '#2d8659';
        selectedCard.style.borderWidth = '3px';
        selectedCard.style.background = 'rgba(45, 134, 89, 0.05)';
        selectedCard.style.transform = 'translateY(-5px)';
        selectedCard.style.boxShadow = '0 8px 20px rgba(45, 134, 89, 0.2)';
    }
    
    // Guardar el doctor seleccionado
    appointmentData.doctor = doctor;
    
    console.log('✅ Doctor seleccionado:', appointmentData.doctor.name);
}

// ===== CARGAR HORARIOS =====
function loadTimeSlots(selectedDate) {
    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlotsContainer.innerHTML = '';
    
    if (!selectedDate) {
        timeSlotsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Seleccione una fecha primero</p>';
        return;
    }
    
    // Simular horarios ocupados
    const occupiedSlots = getRandomOccupiedSlots();
    
    let slotsHTML = '';
    availableTimeSlots.forEach(time => {
        const isDisabled = occupiedSlots.includes(time);
        const disabledClass = isDisabled ? 'disabled' : '';
        
        slotsHTML += `
            <div class="time-slot ${disabledClass}" 
                 ${!isDisabled ? `onclick="selectTimeSlot('${time}', this)"` : ''}>
                ${time}
            </div>
        `;
    });
    
    timeSlotsContainer.innerHTML = slotsHTML;
}

function getRandomOccupiedSlots() {
    const numOccupied = Math.floor(Math.random() * 5) + 3;
    const occupied = [];
    
    for (let i = 0; i < numOccupied; i++) {
        const randomIndex = Math.floor(Math.random() * availableTimeSlots.length);
        const slot = availableTimeSlots[randomIndex];
        if (!occupied.includes(slot)) {
            occupied.push(slot);
        }
    }
    
    return occupied;
}

function selectTimeSlot(time, element) {
    // Remover selección anterior
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Seleccionar nuevo horario
    element.classList.add('selected');
    appointmentData.time = time;
    
    console.log('🕐 Horario seleccionado:', time);
}

// ===== NAVEGACIÓN DE PASOS =====
function nextStep() {
    console.log(`📍 Paso actual: ${currentStep}`);
    
    // Validar paso actual
    if (!validateStep(currentStep)) {
        console.log('❌ Validación fallida');
        return;
    }
    
    console.log('✅ Validación exitosa');
    
    // Cargar contenido del siguiente paso
    if (currentStep === 1) {
        loadDoctors();
    } else if (currentStep === 3) {
        appointmentData.date = document.getElementById('appointmentDate').value;
    } else if (currentStep === 4) {
        collectPatientData();
        showAppointmentSummary();
    }
    
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

function updateStepDisplay() {
    // Actualizar pasos del formulario
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
    
    // Actualizar barra de progreso
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
    
    // Actualizar líneas de progreso
    document.querySelectorAll('.progress-line').forEach((line, index) => {
        if (index < currentStep - 1) {
            line.classList.add('completed');
        } else {
            line.classList.remove('completed');
        }
    });
    
    // Mostrar/ocultar botones
    document.getElementById('prevBtn').style.display = currentStep > 1 ? 'block' : 'none';
    document.getElementById('nextBtn').style.display = currentStep < totalSteps ? 'block' : 'none';
    document.getElementById('submitBtn').style.display = currentStep === totalSteps ? 'block' : 'none';
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== VALIDACIÓN =====
function validateStep(step) {
    switch(step) {
        case 1:
            if (!appointmentData.specialty) {
                alert('⚠️ Por favor, seleccione una especialidad');
                return false;
            }
            break;
            
        case 2:
            if (!appointmentData.doctor) {
                alert('⚠️ Por favor, seleccione un profesional');
                return false;
            }
            break;
            
        case 3:
            const date = document.getElementById('appointmentDate').value;
            if (!date) {
                alert('⚠️ Por favor, seleccione una fecha');
                return false;
            }
            if (!appointmentData.time) {
                alert('⚠️ Por favor, seleccione un horario');
                return false;
            }
            break;
            
        case 4:
            return validatePersonalData();
    }
    return true;
}

function validatePersonalData() {
    const name = document.getElementById('patientName').value.trim();
    const rut = document.getElementById('patientRut').value.trim();
    const email = document.getElementById('patientEmail').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();
    const birthdate = document.getElementById('patientBirthdate').value;
    const gender = document.getElementById('patientGender').value;
    
    if (!name) {
        alert('Por favor, ingrese su nombre completo');
        return false;
    }
    
    if (!rut || !validateRUT(rut)) {
        alert('Por favor, ingrese un RUT válido');
        return false;
    }
    
    if (!email || !validateEmail(email)) {
        alert('Por favor, ingrese un correo electrónico válido');
        return false;
    }
    
    if (!phone) {
        alert('Por favor, ingrese su teléfono');
        return false;
    }
    
    if (!birthdate) {
        alert('Por favor, ingrese su fecha de nacimiento');
        return false;
    }
    
    if (!gender) {
        alert('Por favor, seleccione su género');
        return false;
    }
    
    return true;
}

function validateRUT(rut) {
    const rutPattern = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/;
    return rutPattern.test(rut);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// ===== RECOPILAR DATOS DEL PACIENTE =====
function collectPatientData() {
    appointmentData.patient = {
        name: document.getElementById('patientName').value.trim(),
        rut: document.getElementById('patientRut').value.trim(),
        email: document.getElementById('patientEmail').value.trim(),
        phone: document.getElementById('patientPhone').value.trim(),
        birthdate: document.getElementById('patientBirthdate').value,
        gender: document.getElementById('patientGender').value,
        notes: document.getElementById('patientNotes').value.trim()
    };
}

// ===== MOSTRAR RESUMEN =====
function showAppointmentSummary() {
    const summaryContainer = document.getElementById('appointmentSummary');
    
    const dateObj = new Date(appointmentData.date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('es-CL', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    summaryContainer.innerHTML = `
        <div class="summary-section">
            <h4>📋 Especialidad</h4>
            <p><strong>${appointmentData.specialtyName}</strong></p>
        </div>
        
        <div class="summary-section">
            <h4>👨‍⚕️ Profesional</h4>
            <p><strong>${appointmentData.doctor.name}</strong></p>
            <p>${appointmentData.doctor.specialty}</p>
            <p>${appointmentData.doctor.experience}</p>
        </div>
        
        <div class="summary-section">
            <h4>📅 Fecha y Hora</h4>
            <p><strong>${formattedDate}</strong></p>
            <p>🕐 Hora: <strong>${appointmentData.time}</strong></p>
        </div>
        
        <div class="summary-section">
            <h4>👤 Datos del Paciente</h4>
            <p><strong>Nombre:</strong> ${appointmentData.patient.name}</p>
            <p><strong>RUT:</strong> ${appointmentData.patient.rut}</p>
            <p><strong>Email:</strong> ${appointmentData.patient.email}</p>
            <p><strong>Teléfono:</strong> ${appointmentData.patient.phone}</p>
            ${appointmentData.patient.notes ? `<p><strong>Motivo:</strong> ${appointmentData.patient.notes}</p>` : ''}
        </div>
    `;
}

// ===== ENVIAR CITA =====
function submitAppointment(e) {
    e.preventDefault();
    
    const appointmentNumber = generateAppointmentNumber();
    appointmentData.appointmentNumber = appointmentNumber;
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        generateVoucher();
        sendConfirmationEmail();
        showSuccessMessage();
    }, 2000);
}

function generateAppointmentNumber() {
    const prefix = 'CC';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
}

// ===== GENERAR VOUCHER =====
function generateVoucher() {
    const dateObj = new Date(appointmentData.date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('es-CL', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const today = new Date().toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const voucherHTML = `
        <div class="voucher" id="voucherToPrint">
            <div class="voucher-header">
                <div class="voucher-logo">⚕️</div>
                <h2>Clínica de Carabineros</h2>
                <p>Comprobante de Cita Médica</p>
            </div>
            
            <div class="voucher-number">
                <p><strong>Número de Cita: ${appointmentData.appointmentNumber}</strong></p>
                <p style="font-size: 0.9rem; color: #666;">Generado el: ${today}</p>
            </div>
            
            <div class="voucher-details">
                <div class="voucher-section">
                    <h4>📋 Datos de la Cita</h4>
                    <p><strong>Especialidad:</strong> ${appointmentData.specialtyName}</p>
                    <p><strong>Profesional:</strong> ${appointmentData.doctor.name}</p>
                    <p><strong>Fecha:</strong> ${formattedDate}</p>
                    <p><strong>Hora:</strong> ${appointmentData.time}</p>
                </div>
                
                <div class="voucher-section">
                    <h4>👤 Datos del Paciente</h4>
                    <p><strong>Nombre:</strong> ${appointmentData.patient.name}</p>
                    <p><strong>RUT:</strong> ${appointmentData.patient.rut}</p>
                    <p><strong>Teléfono:</strong> ${appointmentData.patient.phone}</p>
                    <p><strong>Email:</strong> ${appointmentData.patient.email}</p>
                </div>
                
                <div class="voucher-section">
                    <h4>📍 Ubicación</h4>
                    <p><strong>Dirección:</strong> Av. Libertador Bernardo O'Higgins 1234, Santiago</p>
                    <p><strong>Teléfono Clínica:</strong> (56) 2 2927 1000</p>
                </div>
            </div>
            
            <div class="voucher-footer">
                <p style="font-weight: 600; color: var(--carabineros-green);">
                    ✓ Su cita ha sido confirmada exitosamente
                </p>
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">
                    Recibirá un correo de confirmación a: ${appointmentData.patient.email}
                </p>
                
                <div class="important-note">
                    <p><strong>⚠️ Importante:</strong></p>
                    <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                        <li>Llegue 15 minutos antes de su cita</li>
                        <li>Traiga su cédula de identidad y credencial</li>
                        <li>Para cancelar, llame al menos 24 horas antes</li>
                        <li>Presente este comprobante en recepción</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('voucherContainer').innerHTML = voucherHTML;
    document.getElementById('voucherModal').classList.add('active');
}

// ===== ENVÍO DE EMAIL =====
function sendConfirmationEmail() {
    console.log('📧 Confirmación de cita enviada a:', appointmentData.patient.email);
}

// ===== FUNCIONES DE VOUCHER =====
function printVoucher() {
    window.print();
}

function downloadVoucher() {
    alert('En un sistema real, aquí se generaría y descargaría el voucher en formato PDF.');
}

function closeVoucherModal() {
    document.getElementById('voucherModal').classList.remove('active');
    
    setTimeout(() => {
        if (confirm('¿Desea agendar otra cita?')) {
            location.reload();
        } else {
            window.location.href = 'index.html';
        }
    }, 300);
}

// ===== MENSAJES Y LOADING =====
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
        ">
            <div style="
                background: white;
                padding: 3rem;
                border-radius: 16px;
                text-align: center;
            ">
                <p style="font-size: 1.2rem; font-weight: 600;">Procesando su cita...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
}

function showSuccessMessage() {
    if (window.notify) {
        window.notify.show('¡Cita agendada exitosamente!', 'success', 3000);
    }
}

// ===== FORMATEO AUTOMÁTICO DE RUT =====
document.addEventListener('DOMContentLoaded', function() {
    const rutInput = document.getElementById('patientRut');
    if (rutInput) {
        rutInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9kK]/g, '');
            if (value.length > 1) {
                value = value.slice(0, -1) + '-' + value.slice(-1);
            }
            if (value.length > 5) {
                value = value.slice(0, -5) + '.' + value.slice(-5);
            }
            if (value.length > 9) {
                value = value.slice(0, -9) + '.' + value.slice(-9);
            }
            e.target.value = value;
        });
    }
});

console.log('✅ Sistema de agendamiento cargado correctamente');
