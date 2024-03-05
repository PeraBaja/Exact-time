const dayjs= require("dayjs")
var timezone = require('dayjs/plugin/timezone.js')
var utc = require('dayjs/plugin/utc.js')
const { default: MicroModal } = require("micromodal")
let fechaActual = document.querySelector(".fecha-actual")
let horasMinSeg = document.getElementById("horas-minutos-segundos")
let seleccionadorRegiones = document.getElementById("SeleccionadorDeRegiones")
let formSeleccionarRegion = document.getElementById("SeleccionarRegion")
let divNombreRegion = document.getElementById('nombre-region')
const listaDeRegiones = Intl.supportedValuesOf('timeZone')
dayjs.extend(utc)
dayjs.extend(timezone)
MicroModal.init()

let regionUsuario = "America/New_York"
divNombreRegion.textContent = regionUsuario.replace('/', ', ')
listaDeRegiones.forEach(region => {
    opcion = document.createElement('option')
    opcion.value = region
    opcion.textContent = region
    seleccionadorRegiones.appendChild(opcion)
});

formSeleccionarRegion.addEventListener('submit', e  => {
    e.preventDefault()
    regionUsuario = seleccionadorRegiones.value
    divNombreRegion.textContent = regionUsuario.replace('/', ', ')
    MicroModal.close('modal-1')
})

function actualizarFecha(){
        let time = dayjs().tz(regionUsuario)
        const diasDeLaSemana = ['Lun', 'Mar', "Mie", "Jue", "Vie", "Sab", "Dom"]
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
            "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        horasMinSeg.textContent = time.format('HH:mm:ss')
        fechaActual.textContent = `${diasDeLaSemana[time.day() - 1]}, ${time.date()} 
                                    de ${meses[time.month()]}, ${time.year()}` 
}
setInterval(actualizarFecha, 1000)
console.log(listaDeRegiones)
