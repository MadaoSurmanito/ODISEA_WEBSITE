document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/musica.json')
    .then((response) => response.json())
    .then((data) => {
      const seccionPadre = document.getElementById('musica')

      // Ordenar el array de canciones por fecha de publicación
      data.Musica.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha))

      data.Musica.forEach((item, index) => {
        const articulo = document.createElement('article')
        const portada = createImage(item.Portada, item.Titulo, 'portada')
        const infoAlbum = createInfoAlbum(item)

        if (item.Tipo === 'Album') {
          articulo.classList.add('album')
          const contenedorAlbum = createContainerAlbum(portada, infoAlbum)
          articulo.appendChild(contenedorAlbum)
          articulo.appendChild(createListaCanciones(item.Canciones))
        } else {
          articulo.appendChild(portada)
          articulo.appendChild(infoAlbum)
        }

        seccionPadre.appendChild(articulo)
      })

      // Agregar animación de aparición en el viewport
      const articles = document.querySelectorAll('article')
      window.addEventListener('scroll', () => handleScroll(articles))
      handleScroll(articles)
    })

  function createImage(src, alt, className) {
    const img = document.createElement('img')
    img.src = src
    img.alt = alt
    img.addEventListener('click', function () {
      openFullscreen(this)
    })
    img.classList.add(className)
    return img
  }

  function createInfoAlbum(item) {
    const infoAlbum = document.createElement('div')
    infoAlbum.classList.add('infoCancion')

    const titulo = createElementWithText('h2', item.Titulo)
    const fecha = createElementWithText('p', formatDate(item.Fecha))
    infoAlbum.appendChild(titulo)
    infoAlbum.appendChild(fecha)

    if (item.Autor) {
      const autor = createElementWithText('p', item.Autor)
      infoAlbum.appendChild(autor)
    }

    if (item.BreveDescripcion) {
      const breveDescripcion = createElementWithText('p', item.BreveDescripcion)
      infoAlbum.appendChild(breveDescripcion)
    }

    // Crear un div contenedor para "Saber más" y el botón de "Letra"
    const contenedorAcciones = document.createElement('div')
    contenedorAcciones.classList.add('contenedorAcciones')

    const descripcion = createElementWithText('p', 'Saber más')
    descripcion.classList.add('descripcionPopUp')
    descripcion.addEventListener('click', () => mostrarPopUp(item.Descripcion))
    contenedorAcciones.appendChild(descripcion)

    if (item.Letra) {
      const botonLetra = document.createElement('button')
      botonLetra.innerHTML = 'Letra'
      botonLetra.classList.add('botonLetra')
      botonLetra.classList.add('descripcionPopUp')
      botonLetra.addEventListener('click', () => {
        fetch(item.Letra)
          .then((response) => response.text())
          .then((letra) => mostrarPopUp_letra(letra, item.Titulo))
      })
      contenedorAcciones.appendChild(botonLetra)
    }

    infoAlbum.appendChild(contenedorAcciones)

    if (item.Enlaces.length > 0) {
      const divisorEnlaces = createEnlacesDiv(item.Enlaces)
      infoAlbum.appendChild(divisorEnlaces)
    } else {
      const error = createElementWithText('p', 'Actualmente no disponible.')
      infoAlbum.appendChild(error)
    }

    return infoAlbum
  }

  function createElementWithText(tag, text) {
    const element = document.createElement(tag)
    element.innerHTML = text
    return element
  }

  function formatDate(fecha) {
    const fechaPublicacion = new Date(fecha)
    return `Fecha de publicación: ${fechaPublicacion.getDate()}/${fechaPublicacion.getMonth() + 1}/${fechaPublicacion.getFullYear()}`
  }

  function createEnlacesDiv(enlaces) {
    const enlacesNombre = ['Youtube', 'Spotify', 'Apple', 'Amazon']
    const divisorEnlaces = document.createElement('div')
    divisorEnlaces.classList.add('IconosCanciones')

    enlacesNombre.forEach((nombre, index) => {
      const enlace = enlaces.find((e) => e.includes(nombre.toLowerCase()))

      if (enlace) {
        const linkElement = document.createElement('a')
        linkElement.href = enlace

        const img = createImage(`../ico/${nombre}.png`, nombre)
        if (nombre === 'Youtube') img.id = 'IconoYoutube'
        linkElement.appendChild(img)

        divisorEnlaces.appendChild(linkElement)
      } else {
        // Crear un espacio en blanco si no hay enlace
        const emptySpace = document.createElement('div')
        emptySpace.classList.add('iconoVacio')
        divisorEnlaces.appendChild(emptySpace)
      }
    })

    return divisorEnlaces
  }

  function createContainerAlbum(portada, infoAlbum) {
    const contenedorAlbum = document.createElement('div')
    contenedorAlbum.classList.add('contenedorAlbum')
    contenedorAlbum.appendChild(portada)
    contenedorAlbum.appendChild(infoAlbum)
    return contenedorAlbum
  }

  function createListaCanciones(canciones) {
    const listaCanciones = document.createElement('ul')
    listaCanciones.classList.add('listaCanciones')

    canciones.forEach((cancion, index) => {
      const itemCancion = document.createElement('li')
      itemCancion.classList.add('itemCancion')

      const numeroTrack = createElementWithText('span', `${index + 1}.`)
      numeroTrack.classList.add('numeroTrack')

      const contenedorCancion = document.createElement('div')
      contenedorCancion.classList.add('contenedorCancion')
      contenedorCancion.appendChild(numeroTrack)
      contenedorCancion.appendChild(createElementWithText('h3', cancion.Titulo))

      contenedorCancion.appendChild(createElementWithText('p', cancion.Autor))

      contenedorCancion.appendChild(
        createDescripcionCancion(cancion.Descripcion),
      )

      if (cancion.Letra) {
        const botonLetra = document.createElement('button')
        botonLetra.innerHTML = 'Letra'
        botonLetra.classList.add('botonLetra')
        botonLetra.addEventListener('click', () => {
          fetch(cancion.Letra)
            .then((response) => response.text())
            .then((letra) => mostrarPopUp_letra(letra, cancion.Titulo))
        })
        contenedorCancion.appendChild(botonLetra)
      }

      if (cancion.Enlaces.length > 0) {
        const divisorEnlacesCancion = createEnlacesDiv(cancion.Enlaces)
        contenedorCancion.appendChild(divisorEnlacesCancion)
      } else {
        const errorCancion = createElementWithText(
          'p',
          'Actualmente no disponible.',
        )
        errorCancion.classList.add('IconosCanciones')
        contenedorCancion.appendChild(errorCancion)
      }
      itemCancion.appendChild(contenedorCancion)
      listaCanciones.appendChild(itemCancion)
    })

    return listaCanciones
  }

  function createDescripcionCancion(descripcion) {
    const descripcionCancion = createElementWithText('p', 'Saber más')
    descripcionCancion.classList.add('descripcionPopUp')
    descripcionCancion.addEventListener('click', () =>
      mostrarPopUp(descripcion),
    )
    return descripcionCancion
  }

  function handleScroll(articles) {
    articles.forEach((article) => {
      const rect = article.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      article.classList.toggle('visible', isVisible)
    })
  }

  function mostrarPopUp(contenido) {
    createPopUp(contenido)
  }

  function mostrarPopUp_letra(contenido, titulo) {
    createPopUp(contenido, titulo)
  }

  function createPopUp(contenido, titulo) {
    const popUp = document.createElement('div')
    popUp.classList.add('popUp')

    if (titulo) {
      const popUpTitulo = createElementWithText('h2', titulo)
      // Ponerle ID al popUp para poder hacer scroll hasta él
      popUp.id = 'tituloPopUp'
      popUp.appendChild(popUpTitulo)
    }

    const popUpContenido = createElementWithText('p', contenido)
    popUp.appendChild(popUpContenido)

    const fondoNegro = document.createElement('div')
    fondoNegro.classList.add('fondoNegro')

    // Asignar el evento de cierre al fondo negro
    fondoNegro.addEventListener('click', closePopUp)

    document.body.appendChild(fondoNegro)
    document.body.appendChild(popUp)
  }

  function closePopUp() {
    document.querySelector('.popUp').remove()
    document.querySelector('.fondoNegro').remove()
  }
  function openFullscreen(imgElement) {
    const fullscreenDiv = document.createElement('div')
    fullscreenDiv.classList.add('fullscreen')

    const imgClone = imgElement.cloneNode()
    imgClone.style.cursor = 'zoom-out' // Cambiar el cursor para indicar que se puede hacer clic para cerrar

    fullscreenDiv.appendChild(imgClone)
    document.body.appendChild(fullscreenDiv)

    fullscreenDiv.addEventListener('click', function (event) {
      // Cerrar solo si se hace clic fuera de la imagen
      if (event.target === fullscreenDiv || event.target === imgClone) {
        document.body.removeChild(fullscreenDiv)
      }
    })
  }
})
