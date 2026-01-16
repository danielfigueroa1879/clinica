/**
 * ============================================
 * SISTEMA DE AGENDAMIENTO DE CITAS
 * Archivo: agendar-cita.js
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

// ===== HORARIOS DISPONIBLES (9:00 AM - 6:00 PM) =====
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
    console.log('Sistema de agendamiento iniciado');
    
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
    console.log('🏥 Click en especialidad');
    
    // Remover selección anterior
    const allSpecialtyOptions = document.querySelectorAll('.specialty-option');
    allSpecialtyOptions.forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Seleccionar nueva especialidad
    element.classList.add('selected');
    appointmentData.specialty = element.dataset.specialty;
    appointmentData.specialtyName = element.querySelector('h4').textContent;
    
    console.log('✅ Especialidad seleccionada:', appointmentData.specialtyName);
    console.log('📋 Código de especialidad:', appointmentData.specialty);
}

// ===== CARGAR DOCTORES =====
function loadDoctors() {
    console.log('🔄 === INICIANDO loadDoctors() ===');
    
    const doctorSelection = document.getElementById('doctorSelection');
    
    if (!doctorSelection) {
        console.error('❌ No se encontró el contenedor doctorSelection');
        return;
    }
    
    console.log('✅ Contenedor encontrado:', doctorSelection);
    
    // Obtener doctores para la especialidad seleccionada
    const doctors = doctorsDatabase[appointmentData.specialty] || [];
    
    console.log(`📋 Cargando ${doctors.length} doctores para: ${appointmentData.specialtyName}`);
    
    if (doctors.length === 0) {
        doctorSelection.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; color: #666;">
                No hay doctores disponibles para esta especialidad.
            </p>
        `;
        return;
    }
    
    // Crear HTML con ESTILOS INLINE para garantizar visibilidad
    let cardsHTML = '';
    doctors.forEach((doctor, index) => {
        cardsHTML += `
            <div class="doctor-card" 
                 data-doctor-index="${index}" 
                 onclick="handleDoctorClick(${index}); return false;"
                 style="display: flex !important; 
                        background: white; 
                        border: 2px solid #e0e0e0; 
                        border-radius: 12px; 
                        padding: 2rem; 
                        margin-bottom: 1rem; 
                        cursor: pointer; 
                        align-items: center; 
                        gap: 1.5rem;
                        min-height: 120px;
                        opacity: 1;
                        visibility: visible;
                        transition: all 0.3s ease;">
                <div class="doctor-photo" 
                     style="width: 80px; 
                            height: 80px; 
                            border-radius: 50%; 
                            background: linear-gradient(135deg, #3da672, #2d8659); 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            font-size: 2rem;
                            flex-shrink: 0;">
                    ${doctor.photo}
                </div>
                <div class="doctor-info" style="flex: 1;">
                    <h4 style="color: #2d8659; 
                               font-size: 1.2rem; 
                               margin: 0 0 0.5rem 0; 
                               font-weight: 700;">
                        ${doctor.name}
                    </h4>
                    <span class="specialty-badge" 
                          style="display: inline-block; 
                                 background: #d4af37; 
                                 color: #1e5f42; 
                                 padding: 0.2rem 0.8rem; 
                                 border-radius: 20px; 
                                 font-size: 0.8rem; 
                                 font-weight: 600;
                                 margin-bottom: 0.5rem;">
                        ${doctor.specialty}
                    </span>
                    <p style="margin: 0.5rem 0; 
                              color: #666; 
                              font-size: 0.9rem;">
                        📚 ${doctor.experience}
                    </p>
                    <div class="doctor-rating" 
                         style="color: #d4af37; 
                                font-size: 0.9rem; 
                                margin-top: 0.5rem;">
                        ${doctor.rating}
                    </div>
                </div>
            </div>
        `;
        console.log(`✅ Doctor ${index + 1} preparado: ${doctor.name}`);
    });
    
    // Insertar todo el HTML de una vez
    doctorSelection.innerHTML = cardsHTML;
    
    console.log('✅ HTML insertado en el DOM');
    console.log('✅ Todos los doctores cargados correctamente');
    
    // Agregar efecto hover con JavaScript
    setTimeout(() => {
        const cards = document.querySelectorAll('.doctor-card');
        cards.forEach(card => {
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
    
    // Verificar que se insertaron
    setTimeout(() => {
        const loadedCards = document.querySelectorAll('.doctor-card');
        console.log(`🔍 Verificación: ${loadedCards.length} tarjetas de doctores visibles en el DOM`);
        
        if (loadedCards.length > 0) {
            console.log('✅ Las tarjetas están en el DOM');
            console.log('✅ Primera tarjeta:', loadedCards[0]);
            console.log('✅ Primera tarjeta visible:', loadedCards[0].offsetHeight > 0);
            console.log('✅ Primera tarjeta height:', loadedCards[0].offsetHeight, 'px');
        } else {
            console.error('❌ ERROR: Las tarjetas NO están en el DOM');
        }
    }, 100);
}

// Función global para manejar clicks (llamada desde onclick)
window.handleDoctorClick = function(index) {
    console.log('🎯 ========================================');
    console.log('🎯 CLICK DETECTADO VIA ONCLICK');
    console.log('🎯 Index del doctor:', index);
    
    const doctors = doctorsDatabase[appointmentData.specialty];
    
    if (!doctors || !doctors[index]) {
        console.error('❌ Error: Doctor no encontrado en el index', index);
        return;
    }
    
    const doctor = doctors[index];
    
    console.log('👨‍⚕️ Doctor:', doctor.name);
    
    // Remover selección anterior
    const allCards = document.querySelectorAll('.doctor-card');
    allCards.forEach(card => {
        card.classList.remove('selected');
        card.style.borderColor = '#e0e0e0';
        card.style.background = 'white';
        card.style.transform = 'translateY(0)';
    });
    
    // Seleccionar la tarjeta clickeada
    const clickedCard = document.querySelector(`[data-doctor-index="${index}"]`);
    if (clickedCard) {
        clickedCard.classList.add('selected');
        clickedCard.style.borderColor = '#2d8659';
        clickedCard.style.borderWidth = '3px';
        clickedCard.style.background = 'rgba(45, 134, 89, 0.05)';
        clickedCard.style.transform = 'translateY(-5px)';
        clickedCard.style.boxShadow = '0 8px 20px rgba(45, 134, 89, 0.2)';
        console.log('✅ Clase "selected" agregada a la tarjeta');
        console.log('✅ Estilos de selección aplicados');
    } else {
        console.error('❌ No se encontró la tarjeta clickeada');
    }
    
    // Guardar el doctor seleccionado
    appointmentData.doctor = doctor;
    
    console.log('✅ ===== DOCTOR SELECCIONADO EXITOSAMENTE =====');
    console.log('✅ Doctor guardado:', appointmentData.doctor.name);
    console.log('📊 Estado actual:', appointmentData);
    console.log('🎯 ========================================');
    
    return false; // Prevenir comportamiento default
};

// ===== CARGAR HORARIOS =====
function loadTimeSlots(selectedDate) {
    const timeSlotsContainer = document.getElementById('timeSlots');
    timeSlotsContainer.innerHTML = '';
    
    if (!selectedDate) {
        timeSlotsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Seleccione una fecha primero</p>';
        return;
    }
    
    // Simular horarios ocupados (aleatorio)
    const occupiedSlots = getRandomOccupiedSlots();
    
    availableTimeSlots.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        
        if (occupiedSlots.includes(time)) {
            timeSlot.classList.add('disabled');
        } else {
            timeSlot.addEventListener('click', function() {
                selectTimeSlot(time, this);
            });
        }
        
        timeSlotsContainer.appendChild(timeSlot);
    });
}

function getRandomOccupiedSlots() {
    const numOccupied = Math.floor(Math.random() * 5) + 3; // 3-7 horarios ocupados
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
    
    console.log('Horario seleccionado:', time);
}

// ===== NAVEGACIÓN DE PASOS =====
function nextStep() {
    console.log(`📍 Intentando avanzar desde paso ${currentStep}`);
    
    // Validar paso actual antes de continuar
    if (!validateStep(currentStep)) {
        console.log('❌ Validación fallida en paso', currentStep);
        return;
    }
    
    console.log('✅ Validación exitosa');
    
    // Cargar contenido del siguiente paso si es necesario
    if (currentStep === 1) {
        console.log('🔄 Cargando doctores...');
        loadDoctors();
    } else if (currentStep === 3) {
        appointmentData.date = document.getElementById('appointmentDate').value;
        console.log('📅 Fecha seleccionada:', appointmentData.date);
    } else if (currentStep === 4) {
        console.log('📝 Recopilando datos del paciente...');
        collectPatientData();
        showAppointmentSummary();
    }
    
    if (currentStep < totalSteps) {
        currentStep++;
        console.log(`➡️ Avanzando a paso ${currentStep}`);
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

// ===== VALIDACIÓN DE PASOS =====
function validateStep(step) {
    console.log(`🔍 Validando paso ${step}...`);
    
    switch(step) {
        case 1:
            if (!appointmentData.specialty) {
                alert('⚠️ Por favor, seleccione una especialidad');
                console.log('❌ Validación fallida: No hay especialidad seleccionada');
                return false;
            }
            console.log('✅ Paso 1 válido - Especialidad:', appointmentData.specialtyName);
            break;
            
        case 2:
            console.log('🔍 Verificando doctor seleccionado...');
            console.log('📊 Doctor actual:', appointmentData.doctor);
            
            if (!appointmentData.doctor) {
                alert('⚠️ Por favor, seleccione un profesional');
                console.log('❌ Validación fallida: appointmentData.doctor es null o undefined');
                console.log('💡 Sugerencia: Haga click en una de las tarjetas de doctores');
                return false;
            }
            console.log('✅ Paso 2 válido - Doctor:', appointmentData.doctor.name);
            break;
            
        case 3:
            const date = document.getElementById('appointmentDate').value;
            console.log('🔍 Verificando fecha y hora...');
            console.log('📅 Fecha:', date);
            console.log('🕐 Hora:', appointmentData.time);
            
            if (!date) {
                alert('⚠️ Por favor, seleccione una fecha');
                console.log('❌ Validación fallida: No hay fecha seleccionada');
                return false;
            }
            if (!appointmentData.time) {
                alert('⚠️ Por favor, seleccione un horario');
                console.log('❌ Validación fallida: No hay horario seleccionado');
                return false;
            }
            console.log('✅ Paso 3 válido');
            break;
            
        case 4:
            console.log('🔍 Verificando datos personales...');
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
    // Validación básica de RUT chileno
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
    
    // Generar número de cita único
    const appointmentNumber = generateAppointmentNumber();
    appointmentData.appointmentNumber = appointmentNumber;
    
    // Mostrar loading
    showLoading();
    
    // Simular procesamiento
    setTimeout(() => {
        hideLoading();
        
        // Generar y mostrar voucher
        generateVoucher();
        
        // Simular envío de email
        sendConfirmationEmail();
        
        // Mostrar mensaje de éxito
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

// ===== SIMULACIÓN DE ENVÍO DE EMAIL =====
function sendConfirmationEmail() {
    console.log('📧 SIMULACIÓN DE ENVÍO DE EMAIL');
    console.log('═══════════════════════════════════════');
    console.log(`Para: ${appointmentData.patient.email}`);
    console.log(`Asunto: Confirmación de Cita Médica - ${appointmentData.appointmentNumber}`);
    console.log('─────────────────────────────────────');
    console.log(`Estimado/a ${appointmentData.patient.name},`);
    console.log('');
    console.log('Su cita médica ha sido confirmada exitosamente:');
    console.log('');
    console.log(`• Número de Cita: ${appointmentData.appointmentNumber}`);
    console.log(`• Especialidad: ${appointmentData.specialtyName}`);
    console.log(`• Profesional: ${appointmentData.doctor.name}`);
    console.log(`• Fecha: ${appointmentData.date}`);
    console.log(`• Hora: ${appointmentData.time}`);
    console.log('');
    console.log('Adjunto encontrará su comprobante de cita.');
    console.log('');
    console.log('Saludos cordiales,');
    console.log('Clínica de Carabineros');
    console.log('═══════════════════════════════════════');
    
    // En producción real, aquí se haría la llamada al backend
    // fetch('/api/send-email', { method: 'POST', body: JSON.stringify(appointmentData) })
}

// ===== FUNCIONES DE VOUCHER =====
function printVoucher() {
    window.print();
}

function downloadVoucher() {
    // Simular descarga de PDF
    alert('En un sistema real, aquí se generaría y descargaría el voucher en formato PDF.\n\nPor ahora puede imprimir el voucher usando el botón "Imprimir".');
    
    // En producción real, se usaría una librería como jsPDF o html2pdf
    // const element = document.getElementById('voucherToPrint');
    // html2pdf().from(element).save(`cita-${appointmentData.appointmentNumber}.pdf`);
}

function closeVoucherModal() {
    document.getElementById('voucherModal').classList.remove('active');
    
    // Preguntar si desea agendar otra cita
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
                <div class="page-loader" style="position: relative; margin-bottom: 1rem;"></div>
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

console.log('✅ Sistema de agendamiento de citas cargado correctamente');

// ===== FUNCIÓN DE TEST PARA DEBUGGING =====
window.testDoctorSystem = function() {
    console.log('🧪 ===== INICIANDO TEST DEL SISTEMA DE DOCTORES =====');
    console.log('');
    
    console.log('1️⃣ Verificando base de datos de doctores...');
    console.log('   Total de especialidades:', Object.keys(doctorsDatabase).length);
    console.log('   Especialidades disponibles:', Object.keys(doctorsDatabase));
    console.log('');
    
    console.log('2️⃣ Verificando especialidad seleccionada...');
    console.log('   Especialidad actual:', appointmentData.specialty || 'NINGUNA');
    console.log('   Nombre especialidad:', appointmentData.specialtyName || 'NINGUNA');
    console.log('');
    
    if (appointmentData.specialty) {
        const doctors = doctorsDatabase[appointmentData.specialty];
        console.log('3️⃣ Doctores disponibles para esta especialidad:');
        console.log('   Cantidad:', doctors ? doctors.length : 0);
        if (doctors) {
            doctors.forEach((doc, i) => {
                console.log(`   ${i + 1}. ${doc.name} (ID: ${doc.id})`);
            });
        }
    } else {
        console.log('⚠️  No hay especialidad seleccionada aún');
    }
    console.log('');
    
    console.log('4️⃣ Verificando doctor seleccionado...');
    console.log('   Doctor actual:', appointmentData.doctor ? appointmentData.doctor.name : 'NINGUNO');
    console.log('');
    
    console.log('5️⃣ Verificando tarjetas de doctores en el DOM...');
    const cards = document.querySelectorAll('.doctor-card');
    console.log('   Tarjetas encontradas:', cards.length);
    cards.forEach((card, i) => {
        const isSelected = card.classList.contains('selected');
        const doctorIndex = card.getAttribute('data-doctor-index');
        console.log(`   Tarjeta ${i + 1}: Index=${doctorIndex} ${isSelected ? '✅ SELECCIONADA' : ''}`);
    });
    console.log('');
    
    console.log('6️⃣ Verificando contenedor de doctores...');
    const container = document.getElementById('doctorSelection');
    if (container) {
        console.log('   ✅ Contenedor encontrado');
        console.log('   Hijos directos:', container.children.length);
    } else {
        console.log('   ❌ Contenedor NO encontrado');
    }
    console.log('');
    
    console.log('7️⃣ Estado completo del agendamiento:');
    console.log(appointmentData);
    console.log('');
    
    console.log('🧪 ===== TEST COMPLETADO =====');
    console.log('');
    console.log('💡 INSTRUCCIONES:');
    console.log('   - Si no ves doctores, asegúrate de estar en el Paso 2');
    console.log('   - Haz click DIRECTAMENTE en cualquier tarjeta de doctor');
    console.log('   - Deberías ver: 🎯 CLICK DETECTADO EN CONTENEDOR PADRE');
    console.log('   - Luego: ✅ Tarjeta de doctor encontrada');
    console.log('');
    console.log('🔧 PRUEBA MANUAL:');
    console.log('   Ejecuta: document.getElementById("doctorSelection").click()');
    console.log('   Deberías ver el mensaje de click detectado');
};

// ===== FUNCIÓN DE TEST DE CLICK =====
window.testDoctorClick = function() {
    console.log('🧪 ===== TEST DE CLICK EN DOCTORES =====');
    const container = document.getElementById('doctorSelection');
    if (!container) {
        console.log('❌ Contenedor no encontrado. ¿Estás en el paso 2?');
        return;
    }
    
    const cards = container.querySelectorAll('.doctor-card');
    console.log(`📋 Encontradas ${cards.length} tarjetas`);
    
    if (cards.length === 0) {
        console.log('❌ No hay tarjetas. Ejecuta loadDoctors() primero');
        return;
    }
    
    console.log('🖱️ Simulando click en la primera tarjeta...');
    console.log('💡 Llamando a handleDoctorClick(0)...');
    
    handleDoctorClick(0);
    
    setTimeout(() => {
        if (appointmentData.doctor) {
            console.log('✅ ¡ÉXITO! Doctor seleccionado:', appointmentData.doctor.name);
            console.log('✅ Estado:', appointmentData);
        } else {
            console.log('❌ FALLO: El doctor no se seleccionó');
            console.log('💡 Verifica la consola para ver si hay errores');
        }
    }, 500);
};

console.log('💡 TIP: Escribe testDoctorSystem() en la consola para ejecutar un test completo');
console.log('💡 TIP: Escribe testDoctorClick() para simular un click en un doctor');
console.log('');

// ===== FUNCIÓN DE DEBUG PARA VER HTML =====
window.debugDoctors = function() {
    console.log('🔍 ===== DEBUG DE DOCTORES =====');
    
    const container = document.getElementById('doctorSelection');
    console.log('1. Contenedor existe:', !!container);
    
    if (!container) {
        console.error('❌ Contenedor #doctorSelection NO EXISTE en el DOM');
        console.log('💡 Verifica que estés en el paso 2');
        return;
    }
    
    console.log('2. Contenedor encontrado:', container);
    console.log('3. HTML del contenedor:');
    console.log(container.innerHTML);
    console.log('');
    
    console.log('4. Hijos del contenedor:', container.children.length);
    console.log('5. Tarjetas .doctor-card:', container.querySelectorAll('.doctor-card').length);
    console.log('');
    
    const cards = container.querySelectorAll('.doctor-card');
    if (cards.length > 0) {
        console.log('✅ SE ENCONTRARON', cards.length, 'TARJETAS');
        cards.forEach((card, i) => {
            console.log(`   Tarjeta ${i + 1}:`, card);
            console.log(`   Visible:`, card.offsetHeight > 0);
            console.log(`   Display:`, window.getComputedStyle(card).display);
        });
    } else {
        console.log('❌ NO SE ENCONTRARON TARJETAS');
        console.log('💡 Ejecuta: loadDoctors()');
    }
    
    console.log('');
    console.log('6. Especialidad actual:', appointmentData.specialty);
    console.log('7. Doctores en DB:', doctorsDatabase[appointmentData.specialty]?.length || 0);
    console.log('');
    console.log('🔍 ===== FIN DEBUG =====');
    console.log('');
    console.log('💡 Si ves tarjetas pero no son visibles, es un problema de CSS');
    console.log('💡 Si no ves tarjetas, ejecuta: loadDoctors()');
};

console.log('💡 NUEVO: Escribe debugDoctors() para ver el HTML completo');
