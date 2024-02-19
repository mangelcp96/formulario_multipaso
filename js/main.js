document.addEventListener("DOMContentLoaded", function () {
    const pasos = Array.from(document.querySelectorAll(".paso"));
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    const progressBar = document.querySelector(".progress-bar");
    let pasoActual = 1;

    // Actualiza la barra de progreso correctamente al inicio
    function actualizarBarraDeProgreso() {
        const progreso = ((pasoActual - 1) / (pasos.length - 1)) * 100;
        progressBar.style.width = `${progreso}%`;
    }

    // Validar campos requeridos del paso actual
    function validarCamposPaso() {
        const paso = pasos[pasoActual - 1];
        const inputs = paso.querySelectorAll("input[required], select[required]");
        for (let input of inputs) {
            if (!input.value) {
                alert("Todos los campos son requeridos.");
                return false;
            }
            if (input.type === "email" && !validarEmail(input.value)) {
                alert("Por favor, ingrese un correo electrónico válido.");
                return false;
            }
        }
        return true;
    }

    // Validar el formato del email
    function validarEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // Navegación del formulario
    function mostrarPaso(paso) {
        pasos.forEach((paso, index) => {
            paso.style.display = index + 1 === pasoActual ? "block" : "none";
        });
        actualizarBarraDeProgreso();
    }

    function siguientePaso(event) {
        event.preventDefault();
        if (validarCamposPaso()) {
            if (pasoActual === pasos.length) {
                calcularPresupuesto();
            } else {
                pasoActual++;
                mostrarPaso(pasoActual);
                actualizarBotonFinalizar();
            }
        }
    }

    function actualizarBotonFinalizar() {
        const ultimoBotonSiguiente = botonesSiguiente[botonesSiguiente.length - 1];
        if (pasoActual === pasos.length) {
            ultimoBotonSiguiente.textContent = "Finalizar";
            ultimoBotonSiguiente.removeEventListener("click", siguientePaso);
            ultimoBotonSiguiente.addEventListener("click", calcularPresupuesto);
        } else {
            ultimoBotonSiguiente.textContent = "Siguiente";
            ultimoBotonSiguiente.removeEventListener("click", calcularPresupuesto);
            ultimoBotonSiguiente.addEventListener("click", siguientePaso);
        }
    }

    botonesSiguiente.forEach(boton => {
        boton.addEventListener("click", siguientePaso);
    });

    botonesAnterior.forEach(boton => {
        boton.addEventListener("click", function (event) {
            event.preventDefault();
            if (pasoActual > 1) {
                pasoActual--;
                mostrarPaso(pasoActual);
                actualizarBotonFinalizar();
            }
        });
    });

    // Calcular y mostrar el presupuesto
    function calcularPresupuesto() {
        // Costos base para cada tipo de servicio
        const costosServicios = {
            basico: 100,
            avanzado: 200,
            'e-commerce': 300
        };

        // Obtener el valor del servicio seleccionado por el usuario
        const servicioSeleccionado = document.getElementById('servicio').value;

        // Obtener la urgencia seleccionada por el usuario
        const urgenciaSeleccionada = document.querySelector('input[name="urgencia"]:checked').value;

        // Calcular el costo base según el servicio seleccionado
        let costoBase = costosServicios[servicioSeleccionado];

        // Modificar el costo base según la urgencia
        if (urgenciaSeleccionada === 'urgente') {
            costoBase *= 1.2;
        }

        // Mostrar el presupuesto estimado
        alert(`El presupuesto estimado es: ${costoBase}€.`);
    }

    // Inicializar el formulario mostrando el primer paso
    mostrarPaso(pasoActual);
    actualizarBotonFinalizar(); // Asegurar que el botón se inicializa correctamente
});

