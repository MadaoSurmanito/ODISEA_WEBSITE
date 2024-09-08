document.addEventListener('DOMContentLoaded', function () {
  // Cargar conciertos desde los archivos JSON
  loadConcerts('../data/conciertos.json', 'conciertos')
  loadConcerts('../data/conciertosAnteriores.json', 'conciertosAnteriores')
})

// Función principal para cargar conciertos
function loadConcerts(url, containerId) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById(containerId)
      data.Conciertos.forEach((concierto) => {
        const articulo = createConcertArticle(concierto)
        container.appendChild(articulo)
      })
    })
    .catch((error) => console.error('Error cargando conciertos:', error))
}

// Función para crear un artículo de concierto
function createConcertArticle(concierto) {
  const articulo = document.createElement('article');
  articulo.classList.add('concierto-item');

  // Contenedor principal que agrupa el cartel y la información del concierto
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');

  // Contenedor para el cartel y la información del concierto
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('infoConcierto');
  
  // Contenedor para las entradas
  const entradasContainer = document.createElement('div');
  entradasContainer.classList.add('entradas-container');

  // Crear el cartel del concierto y agregarlo al contenedor principal
  const cartel = createImageElement(concierto);
  mainContainer.appendChild(cartel);

  // Agregar el contenedor de información al contenedor principal
  mainContainer.appendChild(infoContainer);
  articulo.appendChild(mainContainer);
  articulo.appendChild(entradasContainer);

  // Crear y agregar el título, ubicación, fecha, y bandas al contenedor de información
  const titulo = createTitleElement(concierto.Titulo);
  infoContainer.appendChild(titulo);

  const ubicacion = createLocationElement(concierto.Ubicación, concierto.Localidad);
  infoContainer.appendChild(ubicacion);

  const fecha = createDateElement(concierto.Fecha);
  infoContainer.appendChild(fecha);

  const bandas = createBandsElement(concierto.Bandas);
  if (bandas) {
    infoContainer.appendChild(bandas);
  }

  // Crear y agregar el elemento de entradas al contenedor de entradas
  const entradas = createEntradasElement(concierto.Entradas);
  if (entradas) {
    entradasContainer.appendChild(entradas);
  }

  return articulo;
}

// Función para crear el elemento de la imagen del cartel
function createImageElement(concierto) {
  const img = document.createElement('img')
  img.src = concierto.Cartel
  img.alt = concierto.Titulo
  img.classList.add('cartel')
  img.addEventListener('click', () => openFullscreen(img))
  return img
}

// Función para crear el elemento del título
function createTitleElement(titulo) {
  const h2 = document.createElement('h2')
  h2.textContent = titulo
  return h2
}

// Función para crear el elemento de la ubicación
function createLocationElement(ubicacion, localidad) {
  const p = document.createElement('p')
  p.textContent = `${ubicacion}, ${localidad}`
  return p
}

// Función para crear el elemento de la fecha
function createDateElement(fechaStr) {
  const p = document.createElement('p')
  const [day, month, year] = fechaStr.split('-')
  const dateObj = new Date(year, month - 1, day)
  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]
  p.textContent = `${days[dateObj.getDay()]} ${dateObj.toLocaleDateString()}`
  return p
}

// Función para crear el elemento de bandas
function createBandsElement(bandas) {
  if (bandas && bandas.length > 0) {
    const p = document.createElement('p')
    p.textContent = `Bandas: ${bandas.join(', ')}`
    return p
  }
  return null
}

// Función para crear el elemento de entradas
function createEntradasElement(entradas) {
  const div = document.createElement('div')
  div.classList.add('entradas')

  if (entradas) {
    if (entradas.startsWith('http')) {
      // Es una URL, crear un botón
      const button = document.createElement('a')
      button.href = entradas
      button.textContent = 'COMPRAR ENTRADAS'
      button.classList.add('button')
      button.target = '_blank' // Abre en una nueva pestaña
      div.appendChild(button)
    } else {
      // Es texto, mostrarlo
      const p = document.createElement('p')
      p.textContent = entradas
      // Poner en mayúsculas
      p.style.textTransform = 'uppercase'
      div.appendChild(p)
    }
  }

  return div
}

// Función para abrir la imagen en pantalla completa
function openFullscreen(imgElement) {
  const fullscreenDiv = document.createElement('div')
  fullscreenDiv.classList.add('fullscreen')
  const imgClone = imgElement.cloneNode()
  fullscreenDiv.appendChild(imgClone)
  document.body.appendChild(fullscreenDiv)

  fullscreenDiv.addEventListener('click', () => {
    document.body.removeChild(fullscreenDiv)
  })
}
