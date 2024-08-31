document.addEventListener('DOMContentLoaded', function () {
  fetch('../data/galeria.json')
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then((data) => {
          const albumsDiv = document.getElementById('albums');

          data.Galeria.forEach((album) => {
              const albumDiv = document.createElement('div');
              albumDiv.classList.add('album');

              // Crear un enlace alrededor de la portada
              const link = document.createElement('a');
              link.href = `album.html?dir=${encodeURIComponent(
                  album.Directorio
              )}&title=${encodeURIComponent(album.Titulo)}`;

              // Imagen de portada
              const img = document.createElement('img');
              img.src = album.Portada; // Usar la portada del JSON
              img.alt = album.Titulo;

              // Contenedor para el título que aparece sobre la imagen
              const titleOverlay = document.createElement('div');
              titleOverlay.classList.add('title-overlay');
              titleOverlay.textContent = album.Titulo;

              link.appendChild(img);
              link.appendChild(titleOverlay);
              albumDiv.appendChild(link);
              albumsDiv.appendChild(albumDiv);
          });
      })
      .catch((error) => console.error('Error loading JSON:', error));
});
