document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/miembros.json')
    .then((response) => response.json())
    .then((data) => {
      const seccionPadre = document.getElementById('conocenos')

      // Crear el artículo "Quiénes Somos"
      const quienesSomos = document.createElement('article')
      quienesSomos.id = 'quienes-somos'

      const quienesSomosTitulo = document.createElement('h2')
      quienesSomosTitulo.textContent = 'Quiénes Somos'

      const quienesSomosContenido = document.createElement('div')
      quienesSomosContenido.classList.add('contenido')

      // Contenedor del texto de "Quiénes Somos"
      const textoContainer = document.createElement('div')
      textoContainer.classList.add('texto-container')

      // Modificar el texto de este artículo a través de "../data/biogrupo.txt"
      fetch('../data/biogrupo.txt')
        .then((response) => response.text())
        .then((text) => {
          const formattedText = text
            .split('\n')
            .map((line) => `<p>${line}</p>`)
            .join('')
          textoContainer.innerHTML = formattedText
        })
        .catch((error) => {
          console.error('Error al cargar el archivo de texto:', error)
        })

      // Crear el carrusel de imágenes
      const carruselContainer = document.createElement('div')
      carruselContainer.classList.add('carrusel-container')

      const carrusel = document.createElement('div')
      carrusel.classList.add('carrusel')

      const imagenes = [
        '../img/foto1.jpg',
        '../img/foto2.jpg',
        '../img/foto3.jpg',
        '../img/foto4.jpg',
        '../img/foto5.jpg',
      ]

      imagenes.forEach((src, index) => {
        const img = document.createElement('img')
        img.src = src
        img.alt = `Imagen ${index + 1}`
        img.classList.add('carrusel-img')
        if (index === 0) img.classList.add('active')
        carrusel.appendChild(img)
      })

      carruselContainer.appendChild(carrusel)

      // Añadir el texto y luego el carrusel al contenido de "Quiénes Somos"
      quienesSomosContenido.appendChild(textoContainer)
      quienesSomosContenido.appendChild(carruselContainer)

      quienesSomos.appendChild(quienesSomosTitulo)
      quienesSomos.appendChild(quienesSomosContenido)
      seccionPadre.appendChild(quienesSomos)

      // Crear artículos para cada miembro de la banda
      data.Miembros.forEach((miembro, index) => {
        const articulo = document.createElement('article')
        articulo.id = `miembro-${index}`

        const titulo = document.createElement('h2')
        titulo.textContent = miembro.Nombre

        const contenido = document.createElement('div')
        contenido.classList.add('contenido', 'miembro-detalle')

        // Imagen del miembro
        const img = document.createElement('img')
        img.src = miembro.Foto
        img.alt = miembro.Nombre
        img.classList.add('fotoMiembro')

        // Información del miembro
        const bio = document.createElement('div') // Cambiado de 'p' a 'div' para permitir múltiples párrafos
        bio.classList.add('biografia')
        // fetch para obtener la biografía de cada miembro en su txt
        fetch(miembro.Biografia)
          .then((response) => response.text())
          .then((text) => {
            const formattedText = text
              .split('\n')
              .map((line) => `<p>${line}</p>`)
              .join('')
            bio.innerHTML = formattedText
          })
          .catch((error) => {
            console.error('Error al cargar el archivo de texto:', error)
          })

        // Widget de Spotify
        const spotifyWidget = document.createElement('iframe')
        spotifyWidget.src = miembro.Playlist
        spotifyWidget.classList.add('spotify-widget')
        spotifyWidget.frameBorder = '0'
        spotifyWidget.allow = 'encrypted-media'

        // Añadir elementos directamente al contenido
        contenido.appendChild(img)
        contenido.appendChild(bio)

        articulo.appendChild(titulo)
        articulo.appendChild(contenido)
        articulo.appendChild(spotifyWidget)
        seccionPadre.appendChild(articulo)

        // Hacer clic en la imagen para ampliarla
        img.addEventListener('click', () => showFullscreen(miembro.Foto))
      })

      // Crear el artículo "Nuestra Filosofía"
      const filosofia = document.createElement('article')
      filosofia.id = 'filosofia'

      const filosofiaTitulo = document.createElement('h2')
      filosofiaTitulo.textContent = 'Nuestra Filosofía'

      const filosofiaContenido = document.createElement('div')
      filosofiaContenido.classList.add('contenido')
      filosofiaContenido.textContent =
        'Aquí va un texto sobre nuestra filosofía.'

      filosofia.appendChild(filosofiaTitulo)
      filosofia.appendChild(filosofiaContenido)
      seccionPadre.appendChild(filosofia)

      // Crear el artículo "Cómo Apoyarnos"
      const apoyarnos = document.createElement('article')
      apoyarnos.id = 'apoyarnos'

      const apoyarnosTitulo = document.createElement('h2')
      apoyarnosTitulo.textContent = 'Cómo Apoyarnos'

      const apoyarnosContenido = document.createElement('div')
      apoyarnosContenido.classList.add('contenido')
      apoyarnosContenido.textContent =
        'Aquí va un texto sobre cómo puedes apoyarnos.'

      apoyarnos.appendChild(apoyarnosTitulo)
      apoyarnos.appendChild(apoyarnosContenido)
      seccionPadre.appendChild(apoyarnos)

      // Agregar animación de aparición en el viewport
      const articles = document.querySelectorAll('article')
      window.addEventListener('scroll', () => handleScroll(articles))
      handleScroll(articles)

      // Inicializar el carrusel
      initCarrusel()
    })
    .catch((error) => {
      console.error('Error al cargar el archivo JSON de miembros:', error)
    })

  function handleScroll(articles) {
    articles.forEach((article) => {
      const rect = article.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      article.classList.toggle('visible', isVisible)
    })
  }

  function showFullscreen(imageUrl) {
    const fullscreenDiv = document.createElement('div')
    fullscreenDiv.classList.add('fullscreen')

    const img = document.createElement('img')
    img.src = imageUrl
    fullscreenDiv.appendChild(img)

    fullscreenDiv.addEventListener('click', function (e) {
      if (e.target === this) {
        closeFullscreen()
      }
    })

    document.body.appendChild(fullscreenDiv)
  }

  function closeFullscreen() {
    const fullscreenDiv = document.querySelector('.fullscreen')
    if (fullscreenDiv) {
      fullscreenDiv.remove()
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeFullscreen()
    }
  })

  function initCarrusel() {
    const images = document.querySelectorAll('.carrusel-img')
    let currentIndex = 0

    setInterval(() => {
      images[currentIndex].classList.remove('active')
      currentIndex = (currentIndex + 1) % images.length
      images[currentIndex].classList.add('active')
    }, 5000) // Cambiar imagen cada 5 segundos
  }
})
