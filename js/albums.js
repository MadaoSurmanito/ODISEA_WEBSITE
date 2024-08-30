document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/galeria.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      const albumsDiv = document.getElementById('albums')

      data.Galeria.forEach((album) => {
        const albumDiv = document.createElement('div')
        albumDiv.classList.add('album')

        const link = document.createElement('a')
        link.href = `album.html?dir=${encodeURIComponent(
          album.Directorio,
        )}&title=${encodeURIComponent(album.Titulo)}`

        const titulo = document.createElement('h2')
        titulo.textContent = album.Titulo
        link.appendChild(titulo)

        albumDiv.appendChild(link)
        albumsDiv.appendChild(albumDiv)
      })
    })
    .catch((error) => console.error('Error loading JSON:', error))
})
