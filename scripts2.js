const botonEnviar = document.getElementById('enviar')
const inputMail = document.getElementById('input-mail')
const viajes = document.getElementsByName('viaje')
const destino = document.getElementsByName('destino')
const presupuesto = document.getElementsByName('presupuesto')
const botonBanner = document.getElementById('pop-close')
const botonRehacerEncuesta = document.getElementById('rehacer-encuesta')
botonBanner.addEventListener('click', () => document.getElementById('pop').classList.toggle('d-none'))

//Transforma los nodelists en arrays
const arrayViajes = [...viajes]
const arrayDestino = [...destino]
const arrayPresupuesto = [...presupuesto]

const rehacerEncuesta = e => {
    e.preventDefault()
    if(localStorage.getItem('encuesta')) {
        localStorage.removeItem('encuesta')
        location.reload()
    }
}

const enviarEncuesta = () => {

    botonRehacerEncuesta.addEventListener('click', rehacerEncuesta)

    botonEnviar.addEventListener('click', (e) => {
        e.preventDefault()

        if (localStorage.getItem('encuesta')) {
            alert('Usted ya ha realizado la encuesta, muchas gracias')
            return
        } else {
            let encuestaCompleta = true
            //Esta seccion valida que se haya seleccionado un item de cada apartado de la encuesta
            if (inputMail.value == '' || arrayViajes.every(item => item.checked == false) || arrayDestino.every(item => item.checked == false) || arrayPresupuesto.every(item => item.checked == false)) {
                encuestaCompleta = false
                alert('Debes llenar todos los campos...')
                return
            }

            //Se crea un objeto para guardar los valores seleccionados por el usuario
            const respuesta = {
                viaje: '',
                destino: '',
                presupuesto: '',
                mail: ''
            }

            //Se crea un array con todos los input que hay en la encuesta
            const radios = document.getElementsByTagName('input')

            //Se crea un array vacío para agregar los elementos input que hayan sido seleccionados por el usuario, usando un iterador for
            let checked = []
            for (i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    checked.push(radios[i].value)
                }
            }

            //Se crea un array con las categorías de las opciones de la encuesta
            const categories = ['Tipo de Viaje:', 'Destino Preferido:', 'Presupuesto:']

            //Se toma del DOM el elemento <ul> que va a guardar las 3 seleciones del usuario para mostrar al final y se cargan con un for
            let lista = document.getElementById('lista')
            for (i = 0; i < checked.length; i++) {
                lista.innerHTML += `<li class="list-group-item bg-success">${categories[i]} ${checked[i]}`
            }

            //Esta sección también carga el mail ingresado por el usuario en el campo "mail", y se agrega por separado del resto porque es un input de otro tipo
            lista.innerHTML += `<li class="list-group-item bg-success">E-mail: ${inputMail.value}</li>`

            //Se cargan en el objeto las opciones seleccionadas por el usuario
            respuesta.viaje = checked[0]
            respuesta.destino = checked[1]
            respuesta.presupuesto = checked[2]
            respuesta.mail = inputMail.value

            //Se verifica que todas las opciones del objeto tengan un valor para que se guarde en el localstorage
            if (respuesta.viaje != '' && respuesta.destino != '' && respuesta.presupuesto != '' && respuesta.mail != '') {
                localStorage.setItem('encuesta', JSON.stringify(respuesta))
            }

            //se verifica que la encuesta haya sido completada para que se muestre el resumen de las opciones seleccionadas por el usuario
            if (encuestaCompleta) {
                document.getElementById('pop').classList.toggle('d-none')
            }
        }
    })
}

enviarEncuesta()




