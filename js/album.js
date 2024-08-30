document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const dir = params.get('dir');
    const title = params.get('title');
  
    if (dir && title) {
      document.getElementById('album-title').textContent = title;
  
      // Función para intentar cargar una imagen con diferentes extensiones
      function tryLoadImage(imageUrl) {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      }
  
      // Cargar imágenes de manera secuencial
      async function loadImages() {
        const extensions = ['.jpg', '.jpeg', '.png'];
        const baseName = 'image'; // Nombre base de las imágenes
        let index = 1;
        let hasMoreImages = true;
  
        while (hasMoreImages) {
          hasMoreImages = false;
          for (const ext of extensions) {
            const imageName = `${baseName}(${index})${ext}`;
            const imageUrl = `${dir}/${imageName}`;
  
            const exists = await tryLoadImage(imageUrl);
            if (exists) {
              hasMoreImages = true;
              const img = document.createElement('img');
              img.src = imageUrl;
              img.alt = title;
              img.classList.add('thumbnail');
              img.addEventListener('click', () => showFullscreen(imageUrl)); // Agregar evento de clic
              document.getElementById('album-images').appendChild(img);
              break; // Salir del bucle de extensiones para pasar a la siguiente imagen numerada
            }
          }
          index++;
        }
      }
  
      loadImages();
    }
  
    function showFullscreen(imageUrl) {
      const fullscreenDiv = document.createElement('div');
      fullscreenDiv.classList.add('fullscreen');
      const img = document.createElement('img');
      img.src = imageUrl;
      fullscreenDiv.appendChild(img);
      fullscreenDiv.addEventListener('click', () => {
        document.body.removeChild(fullscreenDiv);
      });
      document.body.appendChild(fullscreenDiv);
    }
  });
  