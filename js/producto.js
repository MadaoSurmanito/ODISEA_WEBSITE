document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get('id')

  fetch('../data/merch.json')
    .then((response) => response.json())
    .then((data) => {
      const producto = data.Merch[productId]

      // Llenar los datos del producto
      const productoNombre = document.getElementById('producto-nombre')
      const productoDescripcion = document.getElementById(
        'producto-descripcion',
      )
      const productoPrecio = document.getElementById('producto-precio')
      const productoCarrusel = document.getElementById('producto-carrusel')

      productoNombre.textContent = producto.Nombre
      productoDescripcion.textContent =
        producto.Descripcion ||
        'No hay descripción disponible para este producto.'
      productoPrecio.textContent = `Precio: ${producto.Precio}`

      // Crear el carrusel de imágenes con animación
      let imageIndex = 0
      const images = []
      const extensiones = ['jpg', 'jpeg', 'png', 'gif']

      function cargarImagen(src, index) {
        return new Promise((resolve, reject) => {
          const img = document.createElement('img')
          img.src = src
          img.alt = `${producto.Nombre} Imagen ${index}`
          img.onload = function () {
            if (img.complete && img.naturalHeight !== 0) {
              resolve(img)
            } else {
              reject()
            }
          }
          img.onerror = reject
        })
      }

      ;(async function cargarImagenes() {
        for (let i = 1; i <= 5; i++) {
          let imgCargada = false

          for (const ext of extensiones) {
            if (imgCargada) break

            try {
              const imgSrc = `${producto.Fotos}/${i}.${ext}`
              const img = await cargarImagen(imgSrc, i)

              if (!imgCargada) {
                if (images.length === 0) img.classList.add('active')
                productoCarrusel.appendChild(img)
                images.push(img)
                imgCargada = true
              }
            } catch (error) {
              // No hacer nada si la imagen no existe
            }
          }
        }

        // Iniciar el carrusel si hay imágenes
        if (images.length > 0) {
          setInterval(() => {
            images[imageIndex].classList.remove('active')
            imageIndex = (imageIndex + 1) % images.length
            images[imageIndex].classList.add('active')
          }, 3000) // Cambiar imagen cada 3 segundos
        }
      })()
    })
    .catch((error) =>
      console.error('Error al cargar el JSON de productos:', error),
    )
})
