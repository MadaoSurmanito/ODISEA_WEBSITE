document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/musica.json')
    .then((response) => response.json())
    .then((data) => {
      let seccionPadre = document.getElementById('musica')

      // Ordenar el array de canciones por fecha de publicación
      data.Musica.sort((a, b) => {
        return new Date(b.Fecha) - new Date(a.Fecha)
      })

      for (let i = 0; i < data.Musica.length; i++) {
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
        portada.src = data.Musica[i].Portada
        portada.alt = data.Musica[i].Titulo
        portada.classList.add('portada')
        articulo.appendChild(portada)

        // Configuración del divisor
        articulo.appendChild(divisor)
        divisor.classList.add('infoCancion')

        // Configuración del título
        titulo.innerHTML = data.Musica[i].Titulo
        divisor.appendChild(titulo)

        // Configuración de la descripción
        descripcion.innerHTML = data.Musica[i].Descripcion
        divisor.appendChild(descripcion)

        // Configuración de la fecha
        let fechaPublicacion = new Date(data.Musica[i].Fecha)
        fecha.innerHTML =
          'Fecha de publicación: ' +
          fechaPublicacion.getDate() +
          '/' +
          (fechaPublicacion.getMonth() + 1) +
          '/' +
          fechaPublicacion.getFullYear()
        divisor.appendChild(fecha)

        // Configuración del autor
        if (data.Musica[i].Autor != null) {
          autor.innerHTML = data.Musica[i].Autor
          divisor.appendChild(autor)
        }

        // Configuración de los enlaces
        if (data.Musica[i].Enlaces.length == 0) {
          // Crea un p con un mensaje de error
          let error = document.createElement('p')
          error.innerHTML = 'Actualmente no disponible.'
          divisor.appendChild(error)
        } else {
          divisor.appendChild(divisorEnlaces)
          divisorEnlaces.classList.add('IconosCanciones')
          for (let j = 0; j < data.Musica[i].Enlaces.length; j++) {
            let enlace = document.createElement('a')
            enlace.href = data.Musica[i].Enlaces[j]
            let img = document.createElement('img')
            img.src = '../ico/' + enlaces[j] + '.png'
            if (j == 1) img.id = 'IconoYoutube'
            img.alt = enlaces[j]
            enlace.appendChild(img)
            divisorEnlaces.appendChild(enlace)
          }
        }

        // Añadir el artículo al DOM
        seccionPadre.appendChild(articulo)

        // Si el tipo es "Album", mostrar la lista de canciones debajo del artículo
        if (data.Musica[i].Tipo === 'Album') {
          // POnerle al aarticulo la calse album
          articulo.classList.add('album')
          let listaCanciones = document.createElement('ul')
          listaCanciones.classList.add('listaCanciones')

          data.Musica[i].Canciones.forEach((cancion) => {
            let itemCancion = document.createElement('li')
            let tituloCancion = document.createElement('h3')
            let descripcionCancion = document.createElement('p')
            let autorCancion = document.createElement('p')

            tituloCancion.innerHTML = cancion.Titulo
            descripcionCancion.innerHTML = cancion.Descripcion
            autorCancion.innerHTML = cancion.Autor

            itemCancion.appendChild(tituloCancion)
            itemCancion.appendChild(descripcionCancion)
            itemCancion.appendChild(autorCancion)

            // Configuración de los enlaces de la canción
            if (cancion.Enlaces.length == 0) {
              let errorCancion = document.createElement('p')
              errorCancion.innerHTML = 'Actualmente no disponible.'
              itemCancion.appendChild(errorCancion)
            } else {
              let divisorEnlacesCancion = document.createElement('div')
              divisorEnlacesCancion.classList.add('IconosCanciones')
              for (let j = 0; j < cancion.Enlaces.length; j++) {
                let enlaceCancion = document.createElement('a')
                enlaceCancion.href = cancion.Enlaces[j]
                let imgCancion = document.createElement('img')
                imgCancion.src = '../ico/' + enlaces[j] + '.png'
                if (j == 1) imgCancion.id = 'IconoYoutube'
                imgCancion.alt = enlaces[j]
                enlaceCancion.appendChild(imgCancion)
                divisorEnlacesCancion.appendChild(enlaceCancion)
              }
              itemCancion.appendChild(divisorEnlacesCancion)
            }

            listaCanciones.appendChild(itemCancion)
          })

          seccionPadre.appendChild(listaCanciones)
        }
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
