let slideIndex = 0

document.addEventListener('DOMContentLoaded', () => {
  // Función para mostrar el slide activo en el carrusel
  function showSlide(index) {
    const slides = document.querySelectorAll('.carrusel-item')
    if (index >= slides.length) slideIndex = 0
    if (index < 0) slideIndex = slides.length - 1

    slides.forEach((slide) => {
      slide.classList.remove('active')
    })

    slides[slideIndex].classList.add('active')
  }

  // Función para mover el carrusel en la dirección indicada
  function moveSlide(step) {
    slideIndex += step
    showSlide(slideIndex)
  }

  // Cargar datos de música y actualizar el carrusel
  fetch('../data/musica.json')
    .then((response) => response.json())
    .then((data) => {
      data.Musica.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha))
      const ultimoLanzamiento = data.Musica[0]

      const musicaItem = document.getElementById('musica-item')
      musicaItem.innerHTML = `
        <div class="musica-content">
          <img src="${ultimoLanzamiento.Portada}" alt="${
        ultimoLanzamiento.Titulo
      }" class="portada-carrusel"/>
          <div class="musica-info">
            <h2>${ultimoLanzamiento.Titulo}</h2>
            <p>Ya disponible en todas las plataformas digitales</p>
            <div class="IconosCanciones">
              ${createEnlaces(ultimoLanzamiento.Enlaces)}
            </div>
          </div>
        </div>
      `
    })
    .catch((error) => {
      console.error('Error al cargar el archivo JSON de música:', error)
    })

  // Crear los enlaces a plataformas de música
  function createEnlaces(enlaces) {
    const plataformas = ['Youtube', 'Spotify', 'Apple', 'Amazon']
    return plataformas
      .map((nombre) => {
        const enlace = enlaces.find((e) => e.includes(nombre.toLowerCase()))
        if (enlace) {
          const iconId = nombre === 'Youtube' ? 'iconoYoutube' : ''
          return `
            <a href="${enlace}">
              <img src="../ico/${nombre}.png" alt="${nombre}" id="${iconId}"/>
            </a>
          `
        }
        return '<div class="iconoVacio"></div>'
      })
      .join('')
  }

  // Cargar datos de conciertos y actualizar el carrusel
  fetch('../data/conciertos.json')
    .then((response) => response.json())
    .then((data) => {
      const conciertosProximos = data.Conciertos.filter(
        (concierto) => new Date(concierto.Fecha) >= new Date(),
      )
        .sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha))
        .slice(0, 3)

      if (conciertosProximos.length > 0) {
        const conciertosItem = document.getElementById('conciertos-item')
        conciertosItem.innerHTML = `
          <h2>Próximos conciertos:</h2>
          <div class="conciertos-list">
            ${conciertosProximos
              .map(
                (concierto) => `
              <div class="concierto">
                <a href="conciertos.html">
                  <img src="${concierto.Cartel}" alt="${concierto.Titulo}" class="concierto-cartel" />
                </a>
                <h3>${concierto.Titulo}</h3>
                <p>${concierto.Fecha}</p>
              </div>
            `,
              )
              .join('')}
          </div>
        `
      }
    })
    .catch((error) => {
      console.error('Error al cargar el archivo JSON de conciertos:', error)
    })

  // Función para comprobar si una imagen existe
  function checkImageExists(src, callback) {
    const img = new Image()
    img.src = src
    img.onload = () => callback(true)
    img.onerror = () => callback(false)
  }

  // Cargar productos destacados de merch.json
  fetch('../data/merch.json')
    .then((response) => response.json())
    .then((data) => {
      const productosDestacados = data.Merch.slice(0, 3) // Selecciona los 3 primeros productos
      const productosContainer = document.querySelector('.productos-container')

      productosDestacados.forEach((producto) => {
        const productoDiv = document.createElement('div')
        productoDiv.classList.add('producto-destacado')

        const imagenBaseUrl = producto.Fotos
        const extensiones = ['jpg', 'jpeg', 'png', 'gif']
        let imagenEncontrada = false

        // Intentar cargar cada extensión
        for (const ext of extensiones) {
          const imgSrc = `${imagenBaseUrl}1.${ext}`

          checkImageExists(imgSrc, (exists) => {
            if (exists && !imagenEncontrada) {
              const img = document.createElement('img')
              img.src = imgSrc
              img.alt = producto.Nombre
              img.classList.add('producto-img')

              productoDiv.innerHTML = `
              <h3>${producto.Nombre}</h3>
              <p>Precio: ${producto.Precio}</p>
            `
              productoDiv.prepend(img) // Añadir la imagen antes del texto

              imagenEncontrada = true
            }
          })
        }

        productoDiv.addEventListener('click', () => {
          window.location.href = 'merch.html'
        })

        productosContainer.appendChild(productoDiv)
      })
    })
    .catch((error) => {
      console.error('Error al cargar los productos destacados:', error)
    })

  // Mostrar el carrusel tras un pequeño retraso para efectos visuales
  setTimeout(() => {
    const carrusel = document.getElementById('carrusel')
    carrusel.style.opacity = 1
    showSlide(slideIndex)
  }, 500)

  // Desplazamiento automático de slides
  setInterval(() => moveSlide(1), 4000)

  // Manejar el scroll para mostrar la imagen y el texto
  const fotoIndex = document.getElementById('foto_index')
  const presentacionTexto = document.querySelector('.presentacion')
  const fotoPresentacion = document.getElementById('foto-presentacion')

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    const fotoOffsetTop = fotoPresentacion.offsetTop

    // Mostrar la imagen cuando se hace scroll
    if (scrollPosition + windowHeight >= fotoOffsetTop + 200) {
      fotoIndex.style.opacity = '1'
      fotoIndex.style.transform = 'translateY(0)'
    }

    // Fijar la imagen cuando se sigue scrolleando y mostrar el texto
    if (scrollPosition > fotoOffsetTop + 400) {
      fotoPresentacion.classList.add('fixed-image')
      presentacionTexto.style.opacity = '1'
      presentacionTexto.style.transform = 'translateY(-20px)'
    } else {
      fotoPresentacion.classList.remove('fixed-image')
      presentacionTexto.style.opacity = '0'
      presentacionTexto.style.transform = 'translateY(50px)'
    }
  })

  // Cargar datos de los miembros y crear artículos para cada uno
  fetch('../data/miembros.json')
    .then((response) => response.json())
    .then((data) => {
      const seccionPadre = document.getElementById('conocenos')

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
        const bio = document.createElement('p')
        bio.textContent = miembro.Biografia

        // Widget de Spotify
        const spotifyWidget = document.createElement('iframe')
        spotifyWidget.src = miembro.Playlist
        spotifyWidget.width = '100%'
        spotifyWidget.height = '80'
        spotifyWidget.frameBorder = '0'
        spotifyWidget.allow = 'encrypted-media'

        // Añadir elementos directamente al contenedor "contenido-miembro-detalle"
        contenido.appendChild(img)
        contenido.appendChild(bio)
        contenido.appendChild(spotifyWidget)

        articulo.appendChild(titulo)
        articulo.appendChild(contenido)
        seccionPadre.appendChild(articulo)

        // Hacer clic en la imagen para ampliarla
        img.addEventListener('click', function () {
          const overlay = document.createElement('div')
          overlay.classList.add('fondo-overlay')
          document.body.appendChild(overlay)

          img.classList.toggle('ampliada')

          overlay.addEventListener('click', function () {
            img.classList.remove('ampliada')
            overlay.remove()
          })
        })
      })
    })
    .catch((error) => {
      console.error('Error al cargar el archivo JSON de miembros:', error)
    })
})
