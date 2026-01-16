# 📦 CLÍNICA DE CARABINEROS - CÓDIGO COMPLETO

## 📂 ESTRUCTURA DEL PROYECTO

Descarga TODOS estos archivos y colócalos en la MISMA carpeta:

```
📁 clinica-carabineros/
│
├── 📄 index.html              ← Página principal
├── 📄 agendar-cita.html       ← Sistema de agendamiento
│
├── 🎨 styles.css              ← Estilos generales
├── 🎨 agendar-cita.css        ← Estilos de agendamiento
│
├── ⚡ script.js               ← JavaScript general
└── ⚡ agendar-cita.js         ← JavaScript de agendamiento
```

## 🚀 INSTALACIÓN

### Paso 1: Descarga los archivos
Descarga los 6 archivos que aparecen arriba ↑

### Paso 2: Colócalos en una carpeta
Crea una carpeta llamada `clinica-carabineros` y pon todos los archivos ahí.

### Paso 3: Abre index.html
Haz doble click en `index.html` o abre con tu navegador.

## ✅ VERIFICACIÓN

La estructura DEBE verse así:

```
clinica-carabineros/
├── index.html              ✅
├── agendar-cita.html       ✅
├── styles.css              ✅
├── agendar-cita.css        ✅
├── script.js               ✅
└── agendar-cita.js         ✅
```

**IMPORTANTE:** 
- ❌ NO crees subcarpetas (css/, js/, etc.)
- ✅ Todos los archivos en la MISMA carpeta
- ✅ Nombres EXACTOS (minúsculas, con guiones)

## 🎯 USO

### Página Principal (index.html)
1. Abre `index.html` en tu navegador
2. Verás la página principal con todas las especialidades
3. Click en "Agendar Cita" en el menú superior

### Sistema de Agendamiento (agendar-cita.html)
1. Selecciona una especialidad (ej: Odontología Adultos)
2. Click en "Siguiente"
3. Selecciona un doctor (debe ponerse verde)
4. Click en "Siguiente"
5. Selecciona fecha y hora
6. Completa tus datos
7. Confirma y recibe tu voucher

## 🧪 TESTING

Abre la consola (F12) y ejecuta:

```javascript
// Test de sistema de doctores
testDoctorClick()

// Test completo
testDoctorSystem()
```

## 🔧 DEBUGGING

Si los doctores NO se seleccionan:

1. **Abre consola (F12)**
2. **Ejecuta:**
   ```javascript
   testDoctorClick()
   ```
3. **Debes ver:**
   ```
   ✅ ¡ÉXITO! Doctor seleccionado: Dr. Carlos...
   ```

## 📱 COMPATIBILIDAD

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Responsive (móvil, tablet, desktop)

## 🎨 CARACTERÍSTICAS

### Página Principal
- Header institucional
- 10 especialidades médicas
- Horarios de atención
- Información de contacto
- Footer completo
- Diseño responsive

### Sistema de Agendamiento
- 5 pasos intuitivos
- 16 doctores especializados
- Calendario de fechas
- Horarios dinámicos
- Validación de formularios
- Generación de voucher
- Simulación de email
- Impresión de comprobante

## 🌈 COLORES

```css
Verde principal: #2d8659  (claro y vibrante)
Verde oscuro:    #1e5f42  (contraste)
Verde claro:     #3da672  (hover)
Dorado:          #d4af37  (acentos)
```

## 📞 SOPORTE

Si tienes problemas:

1. Verifica que todos los archivos estén en la misma carpeta
2. Recarga con Ctrl+Shift+R (caché limpio)
3. Abre la consola (F12) y busca errores
4. Ejecuta `testDoctorClick()` para verificar

## 🎯 PRÓXIMOS PASOS

Este es un sistema frontend completo. Para hacerlo 100% funcional necesitarías:

- Backend (Node.js, PHP, Python)
- Base de datos (MySQL, PostgreSQL)
- API REST
- Servidor de email
- Generación real de PDF

Pero como demostración y prototipo, funciona perfectamente.

---

**Versión:** 2.0
**Última actualización:** Enero 2025
**Licencia:** MIT

¡Disfruta tu sistema de agendamiento! 🎉
