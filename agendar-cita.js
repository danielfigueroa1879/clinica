/**
 * SISTEMA DE AGENDAMIENTO - VERSIÓN BÁSICA Y SIMPLE
 */

// BASE DE DATOS DE DOCTORES
const doctoresDB = {
    'odontologia-adultos': [
        { id: 1, nombre: 'Dr. Carlos Mendoza', especialidad: 'Odontólogo General', experiencia: '15 años' },
        { id: 2, nombre: 'Dra. María González', especialidad: 'Periodoncista', experiencia: '12 años' },
        { id: 3, nombre: 'Dr. Roberto Sánchez', especialidad: 'Endodoncista', experiencia: '10 años' }
    ],
    'odontologia-ninos': [
        { id: 4, nombre: 'Dra. Patricia Valenzuela', especialidad: 'Odontopediatra', experiencia: '18 años' },
        { id: 5, nombre: 'Dra. Andrea Rojas', especialidad: 'Odontopediatra', experiencia: '8 años' }
    ],
    'medicina-general': [
        { id: 6, nombre: 'Dr. Juan Pablo Martínez', especialidad: 'Médico General', experiencia: '20 años' },
        { id: 7, nombre: 'Dra. Claudia Fernández', especialidad: 'Médico Internista', experiencia: '14 años' }
    ],
    'kinesiologia': [
        { id: 8, nombre: 'Lic. Sebastián Torres', especialidad: 'Kinesiólogo Deportivo', experiencia: '10 años' },
        { id: 9, nombre: 'Lic. Valentina Cortés', especialidad: 'Kinesióloga', experiencia: '7 años' }
    ],
    'psicologia': [
        { id: 10, nombre: 'Ps. Rodrigo Vargas', especialidad: 'Psicólogo Clínico', experiencia: '12 años' },
        { id: 11, nombre: 'Ps. Carolina Espinoza', especialidad: 'Psicóloga Familiar', experiencia: '9 años' }
    ],
    'nutricion': [
        { id: 12, nombre: 'Nut. Daniela Morales', especialidad: 'Nutricionista Clínica', experiencia: '8 años' },
        { id: 13, nombre: 'Nut. Felipe Ramírez', especialidad: 'Nutricionista Deportivo', experiencia: '6 años' }
    ],
    'traumatologia': [
        { id: 14, nombre: 'Dr. Andrés Bustos', especialidad: 'Traumatólogo', experiencia: '16 años' },
        { id: 15, nombre: 'Dr. Esteban Parra', especialidad: 'Traumatólogo Deportivo', experiencia: '11 años' }
    ],
    'medicina-laboral': [
        { id: 16, nombre: 'Dr. Luis Herrera', especialidad: 'Médico Laboral', experiencia: '13 años' }
    ]
};

// VARIABLES GLOBALES
let cita = {
    especialidad: '',
    especialidadNombre: '',
    doctor: null,
    fecha: '',
    hora: '',
    paciente: {}
};

let pasoActual = 1;

// INICIALIZAR
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Sistema iniciado');
    
    // Seleccionar especialidades
    document.querySelectorAll('.specialty-option').forEach(opcion => {
        opcion.addEventListener('click', function() {
            seleccionarEspecialidad(this);
        });
    });
    
    // Botones de navegación
    document.getElementById('nextBtn').addEventListener('click', siguientePaso);
    document.getElementById('prevBtn').addEventListener('click', pasoAnterior);
    document.getElementById('appointmentForm').addEventListener('submit', enviarCita);
    
    // Fecha mínima
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').setAttribute('min', hoy);
});

// SELECCIONAR ESPECIALIDAD
function seleccionarEspecialidad(elemento) {
    console.log('🏥 Especialidad seleccionada');
    
    // Remover selección anterior
    document.querySelectorAll('.specialty-option').forEach(e => {
        e.classList.remove('selected');
    });
    
    // Seleccionar nueva
    elemento.classList.add('selected');
    cita.especialidad = elemento.dataset.specialty;
    cita.especialidadNombre = elemento.querySelector('h4').textContent;
    
    console.log('✅ Especialidad:', cita.especialidadNombre);
}

// MOSTRAR DOCTORES
function mostrarDoctores() {
    console.log('👨‍⚕️ Mostrando doctores...');
    
    const contenedor = document.getElementById('doctorSelection');
    const doctores = doctoresDB[cita.especialidad] || [];
    
    console.log('Total doctores:', doctores.length);
    
    if (doctores.length === 0) {
        contenedor.innerHTML = '<p>No hay doctores disponibles</p>';
        return;
    }
    
    // Crear HTML de doctores
    let html = '';
    doctores.forEach(doctor => {
        html += `
            <div class="doctor-card" onclick="seleccionarDoctor(${doctor.id})">
                <div class="doctor-photo">👨‍⚕️</div>
                <div class="doctor-info">
                    <h4>${doctor.nombre}</h4>
                    <span class="specialty-badge">${doctor.especialidad}</span>
                    <p>${doctor.experiencia}</p>
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
    console.log('✅ Doctores mostrados');
}

// SELECCIONAR DOCTOR
function seleccionarDoctor(idDoctor) {
    console.log('✅ Doctor seleccionado ID:', idDoctor);
    
    // Encontrar el doctor
    let doctorEncontrado = null;
    for (let especialidad in doctoresDB) {
        doctorEncontrado = doctoresDB[especialidad].find(d => d.id === idDoctor);
        if (doctorEncontrado) break;
    }
    
    if (!doctorEncontrado) {
        console.error('Doctor no encontrado');
        return;
    }
    
    cita.doctor = doctorEncontrado;
    
    // Remover selección anterior
    document.querySelectorAll('.doctor-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Marcar como seleccionado
    event.target.closest('.doctor-card').classList.add('selected');
    
    console.log('✅ Doctor guardado:', doctorEncontrado.nombre);
}

// SIGUIENTE PASO
function siguientePaso() {
    console.log('➡️ Paso actual:', pasoActual);
    
    // VALIDAR PASO 1 - Especialidad
    if (pasoActual === 1) {
        if (!cita.especialidad) {
            alert('⚠️ Por favor, seleccione una especialidad');
            return;
        }
        console.log('✅ Especialidad validada');
    }
    
    // VALIDAR PASO 2 - Doctor
    if (pasoActual === 2) {
        if (!cita.doctor) {
            alert('⚠️ Por favor, seleccione un profesional');
            return;
        }
        console.log('✅ Doctor validado');
    }
    
    // VALIDAR PASO 3 - Fecha y Hora
    if (pasoActual === 3) {
        const fecha = document.getElementById('appointmentDate').value;
        if (!fecha) {
            alert('⚠️ Por favor, seleccione una fecha');
            return;
        }
        if (!cita.hora) {
            alert('⚠️ Por favor, seleccione una hora');
            return;
        }
        cita.fecha = fecha;
        console.log('✅ Fecha y hora validadas');
    }
    
    // VALIDAR PASO 4 - Datos Personales
    if (pasoActual === 4) {
        if (!document.getElementById('patientName').value) {
            alert('Por favor, ingrese su nombre');
            return;
        }
        if (!document.getElementById('patientEmail').value) {
            alert('Por favor, ingrese su email');
            return;
        }
        console.log('✅ Datos validados');
    }
    
    // Mostrar doctores cuando se entra al paso 2
    if (pasoActual === 1) {
        mostrarDoctores();
    }
    
    // Cargar horarios cuando se entra al paso 3
    if (pasoActual === 2) {
        cargarHorarios();
    }
    
    // Mostrar resumen cuando se entra al paso 5
    if (pasoActual === 4) {
        mostrarResumen();
    }
    
    // Avanzar a siguiente paso
    if (pasoActual < 5) {
        pasoActual++;
        actualizarPantalla();
    }
}

// PASO ANTERIOR
function pasoAnterior() {
    if (pasoActual > 1) {
        pasoActual--;
        actualizarPantalla();
    }
}

// ACTUALIZAR PANTALLA
function actualizarPantalla() {
    console.log('📍 Actualizando a paso:', pasoActual);
    
    // Ocultar todos los pasos
    document.querySelectorAll('.form-step').forEach(paso => {
        paso.classList.remove('active');
    });
    
    // Mostrar paso actual
    document.querySelector(`[data-step="${pasoActual}"]`).classList.add('active');
    
    // Actualizar barra de progreso
    document.querySelectorAll('.progress-step').forEach((paso, indice) => {
        const num = indice + 1;
        paso.classList.remove('active', 'completed');
        if (num < pasoActual) paso.classList.add('completed');
        if (num === pasoActual) paso.classList.add('active');
    });
    
    // Actualizar líneas de progreso
    document.querySelectorAll('.progress-line').forEach((linea, indice) => {
        if (indice < pasoActual - 1) {
            linea.classList.add('completed');
        } else {
            linea.classList.remove('completed');
        }
    });
    
    // Mostrar/ocultar botones
    document.getElementById('prevBtn').style.display = pasoActual > 1 ? 'block' : 'none';
    document.getElementById('nextBtn').style.display = pasoActual < 5 ? 'block' : 'none';
    document.getElementById('submitBtn').style.display = pasoActual === 5 ? 'block' : 'none';
    
    // Scroll arriba
    window.scrollTo(0, 0);
}

// CARGAR HORARIOS
function cargarHorarios() {
    const contenedor = document.getElementById('timeSlots');
    const horarios = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
    
    let html = '';
    horarios.forEach(hora => {
        html += `
            <div class="time-slot" onclick="seleccionarHora('${hora}', this)">
                ${hora}
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
}

// SELECCIONAR HORA
function seleccionarHora(hora, elemento) {
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    elemento.classList.add('selected');
    cita.hora = hora;
    console.log('🕐 Hora:', hora);
}

// MOSTRAR RESUMEN
function mostrarResumen() {
    const contenedor = document.getElementById('appointmentSummary');
    
    const resumen = `
        <div class="summary-section">
            <h4>📋 Especialidad</h4>
            <p><strong>${cita.especialidadNombre}</strong></p>
        </div>
        
        <div class="summary-section">
            <h4>👨‍⚕️ Profesional</h4>
            <p><strong>${cita.doctor.nombre}</strong></p>
            <p>${cita.doctor.especialidad}</p>
        </div>
        
        <div class="summary-section">
            <h4>📅 Fecha y Hora</h4>
            <p><strong>${cita.fecha}</strong></p>
            <p><strong>${cita.hora}</strong></p>
        </div>
        
        <div class="summary-section">
            <h4>👤 Datos del Paciente</h4>
            <p><strong>Nombre:</strong> ${document.getElementById('patientName').value}</p>
            <p><strong>Email:</strong> ${document.getElementById('patientEmail').value}</p>
        </div>
    `;
    
    contenedor.innerHTML = resumen;
}

// ENVIAR CITA
function enviarCita(e) {
    e.preventDefault();
    
    const numerosCita = 'CC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const voucher = `
        <div class="voucher">
            <div class="voucher-header">
                <h2>✅ ¡CITA CONFIRMADA!</h2>
                <p>Número de Cita: ${numerosCita}</p>
            </div>
            
            <div class="voucher-details">
                <p><strong>Especialidad:</strong> ${cita.especialidadNombre}</p>
                <p><strong>Profesional:</strong> ${cita.doctor.nombre}</p>
                <p><strong>Fecha:</strong> ${cita.fecha}</p>
                <p><strong>Hora:</strong> ${cita.hora}</p>
                <p><strong>Paciente:</strong> ${document.getElementById('patientName').value}</p>
            </div>
            
            <div class="voucher-footer">
                <p>Se ha enviado una confirmación a tu correo</p>
            </div>
        </div>
    `;
    
    document.getElementById('voucherContainer').innerHTML = voucher;
    document.getElementById('voucherModal').classList.add('active');
}

function closeVoucherModal() {
    document.getElementById('voucherModal').classList.remove('active');
    if (confirm('¿Agendar otra cita?')) {
        location.reload();
    } else {
        window.location.href = 'index.html';
    }
}

function printVoucher() {
    window.print();
}

function downloadVoucher() {
    alert('En un sistema real, aquí se descargaría el PDF');
}

console.log('✅ Sistema de agendamiento cargado');
