const tipoInmueble = document.getElementById('tipoInmueble')
const metrosCuadrados = document.getElementById('metrosCuadrados')
const catidadPersonas = document.getElementById('catidadPersonas')
const generos_edades_contenedor = document.getElementById('generos-edades')
const genero = document.getElementById('genero')
const edad = document.getElementById('edad')
const btnCalcular = document.getElementById('btnCalcular')

const calculo = {
    tipoInmueble: '',
    administracion: 0,
    cuotaAseo: 0,
    derechosGym: 0,
    totalPagar: 0
}

const ADMINISTRACION_VALOR_1 = 1500
const ADMINISTRACION_CASA = 100000
const ADMINISTRACION_APARTAMENTO = 50000
const CUOTA_ASEO = 1000

catidadPersonas.addEventListener('change', pedirEdades)
catidadPersonas.addEventListener('input', pedirEdades)

btnCalcular.addEventListener('click', obtenerValores)


function obtenerValores() {
    const valorTipoDeInmueble = tipoInmueble.value.trim()
    const valorMetrosCuadrados = Number(metrosCuadrados.value.trim())
    const valorCantidadPersonas = catidadPersonas.value.trim()

    if (!valorTipoDeInmueble || !valorMetrosCuadrados || !valorCantidadPersonas) {
        alert("Faltan datos")
        return
    }
    calcularAdministracion(valorTipoDeInmueble, valorMetrosCuadrados)
    calcularCuotaAseo(valorMetrosCuadrados)
    calcularDerechosGYM(valorCantidadPersonas)
    calcularTotal()
    pintarResultado()
}

function calcularAdministracion(valorTipoDeInmueble, valorMetrosCuadrados) {
    calculo.tipoInmueble = valorTipoDeInmueble
    if (valorTipoDeInmueble === 'apartamento') {
        calculo.administracion = valorMetrosCuadrados * ADMINISTRACION_VALOR_1 + ADMINISTRACION_APARTAMENTO
    }
    if (valorTipoDeInmueble === 'casa') {
        calculo.administracion = valorMetrosCuadrados * ADMINISTRACION_VALOR_1 + ADMINISTRACION_CASA
    }
}

function calcularCuotaAseo(valorMetrosCuadrados) {
    const porcentajeAdministracion = (calculo.administracion * 10) / 100
    calculo.cuotaAseo = porcentajeAdministracion + valorMetrosCuadrados * CUOTA_ASEO
}

function pedirEdades(ev) {
    cantHabitantes = Number(ev.target.value) > 1 ? Number(ev.target.value) : 1;

    const inputs = `
        <div class="input-box">
        <div>
            <label for="genero">Genero</label>
            <select name="genero" id="genero" class="genero">
                <option value="">Escoja un genero</option>
                <option value="m">Masculino</option>
                <option value="f">Femenino</option>
            </select>
        </div>
        </div>
        <div class="input-box">
            <label for="edad">Edad</label>
            <input type="number"  class="edad" id="edad" />
        </div>
    `;

    generos_edades_contenedor.innerHTML = "";

    for (let i = 0; i < cantHabitantes; i++) {
        generos_edades_contenedor.innerHTML += inputs;
    }
}

function calcularDerechosGYM(genero, edad) {
    const generos = document.querySelectorAll(".genero");
    const edades = document.querySelectorAll(".edad");

    for (let i = 0; i < generos.length; i++) {
        let genero = generos[i].value.trim();
        let edad = edades[i].value.trim();
        let valorgym = 0

        if (!genero || !edad) {
            alert("Faltan datos")
            return
        }

        if (genero == "m") {
            if (edad < 10) {
                valorgym = 0;
            } else if (edad >= 10 && edad < 20) {
                valorgym = 20000;
            } else if (edad >= 20 && edad < 40) {
                valorgym = 15000;
            } else if (edad >= 40 && edad < 60) {
                valorgym = 10000;
            } else {
                valorgym = 0;
            }
        } else if (genero == "f") {
            if (edad < 10) {
                valorgym = 0;
            } else if (edad >= 10 && edad < 18) {
                valorgym = 15000;
            } else if (edad >= 18 && edad < 35) {
                valorgym = 12000;
            } else if (edad >= 35 && edad < 55) {
                valorgym = 10000;
            } else {
                valorgym = 0;
            }
        } else {
            console.error("Genero no valido")
        }
        calculo.derechosGym += valorgym
    }
}

function calcularTotal() {
    calculo.totalPagar = calculo.administracion + calculo.cuotaAseo + calculo.derechosGym
}

function pintarResultado() {
    document.getElementById('tipoInmueble').innerText = 'Señores ' + calculo.tipoInmueble
    document.getElementById('resultadoAdministracion').innerText = calculo.administracion
    document.getElementById('resultadoCuotaAseo').innerText = calculo.cuotaAseo
    document.getElementById('resultadoValorGimnasio').innerText = calculo.derechosGym
    document.getElementById('resultadoTotalPagar').innerText = calculo.totalPagar
}
