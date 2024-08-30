document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/musica.json')
    .then((response) => response.json())
    .then((data) => {
      let seccionPadre = document.getElementById('musica')

      console.log(data)

      //Ordenar el array de canciones por fecha de publicación
      data.Musica.sort((a, b) => {
        console.log(a.Fecha)
        console.log(b.Fecha)
        console.log(new Date(b.Fecha))
        console.log(new Date(a.Fecha))
        console.log(new Date(b.Fecha) - new Date(a.Fecha))
        return new Date(b.Fecha) - new Date(a.Fecha)
      })

      console.log(data)

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
        fecha.innerHTML = 'Fecha de publicación: ' + fechaPublicacion.getDate() + '/' + (fechaPublicacion.getMonth() + 1) + '/' + fechaPublicacion.getFullYear()
        divisor.appendChild(fecha)

        // Configuración del autor
        autor.innerHTML = data.Musica[i].Autor
        divisor.appendChild(autor)

        // Configuración de los enlaces
        divisor.appendChild(divisorEnlaces)
        divisorEnlaces.classList.add('IconosMusica')
        for (let j = 0; j < data.Musica[i].Enlaces.length; j++) {
          let enlace = document.createElement('a')
          enlace.href = data.Musica[i].Enlaces[j]
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
