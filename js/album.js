document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search)
  const dir = params.get('dir')
  const title = params.get('title')
  let images = []

  if (dir && title) {
    document.getElementById('album-title').textContent = title

    async function loadImages() {
      const extensions = ['.jpg', '.jpeg', '.png']
      const baseName = 'image'
      let index = 1
      let hasMoreImages = true

      while (hasMoreImages) {
        hasMoreImages = false
        for (const ext of extensions) {
          const imageName = `${baseName}(${index})${ext}`
          const imageUrl = `${dir}/${imageName}`
          const exists = await tryLoadImage(imageUrl)
          if (exists) {
            hasMoreImages = true
            images.push(imageUrl)
             displayImage(imageUrl) // Espera a que la imagen termine la animación
            break
          }
        }
        index++
      }
    }

    loadImages()
  }

  function tryLoadImage(imageUrl) {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = imageUrl
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
    })
  }

  async function displayImage(imageUrl) {
    const img = document.createElement('img')
    img.src = imageUrl
    img.alt = 'Album Image'
    img.classList.add('thumbnail')
    img.style.opacity = '0' // Inicialmente la imagen es invisible
    img.addEventListener('click', () => showFullscreen(imageUrl))

    document.getElementById('album-images').appendChild(img)

    // Espera a que la imagen se cargue completamente
    await new Promise((resolve) => {
      img.onload = resolve
    })

    // Añadir una breve pausa antes de iniciar la animación (ajustable)
    await new Promise((resolve) => setTimeout(resolve, 50))

    // Aplicar animación de entrada
    img.style.opacity = '1'
    img.classList.add('zoom-in')

    // Espera a que la animación termine antes de continuar con la siguiente imagen
    await new Promise((resolve) => {
      img.addEventListener('animationend', resolve)
    })

    // Aplicar la animación de desplazamiento hacia la izquierda
    const previousImages = document.querySelectorAll('.thumbnail')
    previousImages.forEach((prevImg, i) => {
      if (i < previousImages.length - 1) {
        // No aplicar al último (el nuevo)
        prevImg.classList.add('slide-left')
      }
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
})
