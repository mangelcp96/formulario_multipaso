document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formRegistro");
    const pasos = Array.from(document.querySelectorAll(".paso"));
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    const progressBar = document.querySelector(".progress-bar");
    let pasoActual = 1;

    // Función para actualizar la barra de progreso
    function actualizarBarraDeProgreso(paso) {
        const progreso = (paso - 1) / (pasos.length - 1) * 100;
        progressBar.style.width = `${progreso}%`;
    }

    // Función para validar los campos requeridos
    function validarCampos(paso) {
        const inputs = paso.querySelectorAll("input, select");
        return Array.from(inputs).every(input => input.value.trim() !== '');
    }

    // Función para mostrar el paso actual
    function mostrarPaso(paso) {
        pasos.forEach((p, index) => {
            p.style.display = index + 1 === paso ? "block" : "none";
        });
        pasoActual = paso;
        actualizarBarraDeProgreso(paso);
    }

    // Función para avanzar al siguiente paso
    function siguientePaso() {
        const paso = pasos[pasoActual - 1];
        if (validarCampos(paso)) {
            mostrarPaso(pasoActual + 1);
        } else {
            alert("Por favor, complete todos los campos antes de continuar.");
        }
    }

    // Función para regresar al paso anterior
    function pasoAnterior() {
        mostrarPaso(pasoActual - 1);
    }

    // Función para calcular y mostrar el presupuesto
    function calcularPresupuesto() {
        // Aquí se puede añadir la lógica para calcular el presupuesto
        // Por ejemplo, variar el precio según el servicio y la urgencia
        const servicio = document.getElementById('servicio').value;
        const urgencia = document.querySelector('input[name="urgencia"]:checked').value;
        let presupuesto = 50; // Presupuesto base

        // Aumentar el presupuesto según el servicio seleccionado
        if (servicio === 'completo') {
            presupuesto += 50;
        } else if (servicio === 'premium') {
            presupuesto += 100;
        }

        // Aumentar el presupuesto si la urgencia es alta
        if (urgencia === 'urgente') {
            presupuesto *= 1.2; // Aumenta en un 20%
        }

        alert(`El presupuesto estimado es: ${presupuesto}€`);
    }

    // Eventos para botones "Siguiente" y "Anterior"
    botonesSiguiente.forEach((boton, index) => {
        boton.addEventListener("click", function(event) {
            event.preventDefault();
            if (index === botonesSiguiente.length - 1) {
                calcularPresupuesto();
            } else {
                siguientePaso();
            }
        });
    });

    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", function(event) {
            event.preventDefault();
            pasoAnterior();
        });
    });

    // Prevenir el comportamiento por defecto del formulario
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        calcularPresupuesto();
    });

    // Inicializar mostrando el primer paso
    mostrarPaso(pasoActual);
});
