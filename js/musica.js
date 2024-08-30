document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/musica.json')
    .then((response) => response.json())
    .then((data) => {
      let seccionPadre = document.getElementById('musica')

      for (let i = 0; i < data.Canciones.length; i++) {
        // Crear el artículo
        let articulo = document.createElement('article')

        // Info de la canción
        let portada = document.createElement('img')
        let divisor = document.createElement('div')
        let divisorEnlaces = document.createElement('div')
        let titulo = document.createElement('h2')
        let descripcion = document.createElement('p')
        let fecha = document.createElement('p')
        let autor = document.createElement('p')
        let enlaces = ['Spotify', 'Youtube', 'Apple', 'Amazon']

        // Configuración de la portada
        portada.src = data.Canciones[i].Portada
        portada.alt = data.Canciones[i].Titulo
        portada.classList.add('portada')
        articulo.appendChild(portada)

        // Configuración del divisor
        articulo.appendChild(divisor)
        divisor.classList.add('infoCancion')

        // Configuración del título
        titulo.innerHTML = data.Canciones[i].Titulo
        divisor.appendChild(titulo)

        // Configuración de la descripción
        descripcion.innerHTML = data.Canciones[i].Descripcion
        divisor.appendChild(descripcion)

        // Configuración de la fecha
        fecha.innerHTML = 'Fecha de publicación: ' + data.Canciones[i].Fecha
        divisor.appendChild(fecha)

        // Configuración del autor
        autor.innerHTML = data.Canciones[i].Autor
        divisor.appendChild(autor)

        // Configuración de los enlaces
        divisor.appendChild(divisorEnlaces)
        divisorEnlaces.classList.add('IconosCanciones')
        for (let j = 0; j < data.Canciones[i].Enlaces.length; j++) {
          let enlace = document.createElement('a')
          enlace.href = data.Canciones[i].Enlaces[j]
          let img = document.createElement('img')
          img.src = '../ico/' + enlaces[j] + '.png'
          img.alt = enlaces[j]
          enlace.appendChild(img)
          divisorEnlaces.appendChild(enlace)
        }

        // Añadir el artículo al DOM
        seccionPadre.appendChild(articulo)
      }

      // Agregar animación de aparición en el viewport
      const articles = document.querySelectorAll('article')

      const isInViewport = (element) => {
        const rect = element.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      }

      const handleScroll = () => {
        articles.forEach((article) => {
          if (isInViewport(article)) {
            article.classList.add('visible')
          } else {
            article.classList.remove('visible')
          }
        })
      }

      window.addEventListener('scroll', handleScroll)

      // Ejecutar handleScroll inmediatamente después de añadir los artículos
      handleScroll()
    })
})
