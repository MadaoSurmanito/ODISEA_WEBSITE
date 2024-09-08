document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/merch.json')
    .then((response) => response.json())
    .then((data) => {
      const merchGrid = document.getElementById('merch-grid')
      data.Merch.forEach((producto, index) => {
        // Crear contenedor del producto
        const merchItem = document.createElement('div')
        merchItem.classList.add('merch-item')

        // Añadir imagen del producto
        const img = document.createElement('img')
        img.src = `${producto.Fotos}/1.jpg` // Imagen principal del producto
        img.alt = producto.Nombre
        merchItem.appendChild(img)

        // Añadir nombre del producto
        const nombre = document.createElement('h3')
        nombre.textContent = producto.Nombre
        merchItem.appendChild(nombre)

        // Hacer clic para ir a la página del producto
        merchItem.addEventListener('click', function () {
          window.location.href = `producto.html?id=${index}`
        })

        // Añadir el producto al grid
        merchGrid.appendChild(merchItem)
      })
    })
    .catch((error) =>
      console.error('Error al cargar el JSON de productos:', error),
    )
})

/* Animación de aparición para el artículo de Cómo pedir al hacer scroll */
document.addEventListener('scroll', function () {
  const comoPedirSection = document.getElementById('como-pedir')
  const triggerPoint = window.innerHeight * 0.8 // El punto en que aparece (80% del viewport)

  if (window.scrollY > triggerPoint) {
    comoPedirSection.classList.add('show')
  }
})
