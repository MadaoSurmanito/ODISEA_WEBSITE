document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/conciertos.json')
    .then((response) => response.json())
    .then((data) => {
      let seccionConciertos = document.getElementById('conciertos')

      for (let i = 0; i < data.Conciertos.length; i++) {
        // Crear el artículo
        let articulo = document.createElement('article')
        articulo.classList.add('concierto-item')

        // Info del concierto
        let cartel = document.createElement('img')
        let divisor = document.createElement('div')
        let titulo = document.createElement('h2')
        let ubicacion = document.createElement('p')
        let localidad = document.createElement('p')
        let fecha = document.createElement('p')
        let bandas = document.createElement('p') // Nueva sección para las bandas

        // Configuración del cartel
        cartel.src = data.Conciertos[i].Cartel
        cartel.alt = data.Conciertos[i].Titulo
        cartel.classList.add('cartel')
        cartel.addEventListener('click', function () {
          openFullscreen(this)
        })
        articulo.appendChild(cartel)

        // Configuración del divisor
        articulo.appendChild(divisor)
        divisor.classList.add('infoConcierto')

        // Configuración del título
        titulo.innerHTML = data.Conciertos[i].Titulo
        divisor.appendChild(titulo)

        // Configuración de la ubicación
        ubicacion.innerHTML = 'Ubicación: ' + data.Conciertos[i].Ubicación
        divisor.appendChild(ubicacion)

        // Configuración de la localidad
        localidad.innerHTML = 'Localidad: ' + data.Conciertos[i].Localidad
        divisor.appendChild(localidad)

        // Configuración de la fecha
        fecha.innerHTML = 'Fecha: ' + data.Conciertos[i].Fecha
        divisor.appendChild(fecha)

        // Configuración de las bandas
        if (data.Conciertos[i].Bandas && data.Conciertos[i].Bandas.length > 0) {
          bandas.innerHTML = 'Bandas: ' + data.Conciertos[i].Bandas.join(', ')
          divisor.appendChild(bandas)
        }

        // Añadir el artículo al DOM
        seccionConciertos.appendChild(articulo)
      }
    })

    
  fetch('../data/conciertosAnteriores.json')
    .then((response) => response.json())
    .then((data) => {
      let seccionConciertos = document.getElementById('conciertosAnteriores')

      for (let i = 0; i < data.Conciertos.length; i++) {
        // Crear el artículo
        let articulo = document.createElement('article')
        articulo.classList.add('concierto-item')

        // Info del concierto
        let cartel = document.createElement('img')
        let divisor = document.createElement('div')
        let titulo = document.createElement('h2')
        let ubicacion = document.createElement('p')
        let localidad = document.createElement('p')
        let fecha = document.createElement('p')
        let bandas = document.createElement('p') // Nueva sección para las bandas

        // Configuración del cartel
        cartel.src = data.Conciertos[i].Cartel
        cartel.alt = data.Conciertos[i].Titulo
        cartel.classList.add('cartel')
        cartel.addEventListener('click', function () {
          openFullscreen(this)
        })
        articulo.appendChild(cartel)

        // Configuración del divisor
        articulo.appendChild(divisor)
        divisor.classList.add('infoConcierto')

        // Configuración del título
        titulo.innerHTML = data.Conciertos[i].Titulo
        divisor.appendChild(titulo)

        // Configuración de la ubicación
        ubicacion.innerHTML = 'Ubicación: ' + data.Conciertos[i].Ubicación
        divisor.appendChild(ubicacion)

        // Configuración de la localidad
        localidad.innerHTML = 'Localidad: ' + data.Conciertos[i].Localidad
        divisor.appendChild(localidad)

        // Configuración de la fecha
        fecha.innerHTML = 'Fecha: ' + data.Conciertos[i].Fecha
        divisor.appendChild(fecha)

        // Configuración de las bandas
        if (data.Conciertos[i].Bandas && data.Conciertos[i].Bandas.length > 0) {
          bandas.innerHTML = data.Conciertos[i].Bandas.join(', ')
          divisor.appendChild(bandas)
        }

        // Añadir el artículo al DOM
        seccionConciertos.appendChild(articulo)
      }
    })
  // Función para abrir la imagen en pantalla completa
  function openFullscreen(imgElement) {
    const fullscreenDiv = document.createElement('div')
    fullscreenDiv.classList.add('fullscreen')
    const imgClone = imgElement.cloneNode()
    fullscreenDiv.appendChild(imgClone)
    document.body.appendChild(fullscreenDiv)

    fullscreenDiv.addEventListener('click', function () {
      document.body.removeChild(fullscreenDiv)
    })
  }
})
