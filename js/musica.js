document.addEventListener('DOMContentLoaded', function () {
  fetch('../musica/musica.json')
    .then((response) => response.json())
    .then((data) => {
      let seccionPadre = document.getElementById('musica')
      for (let i = 0; i < data.Canciones.length; i++) {
        //Cuadradito donde va
        let articulo = document.createElement('article')

        //Info de la cancion
        let portada = document.createElement('img')

        let divisor = document.createElement('div')
        let divisorEnlaces = document.createElement('div')
        // Todo esto va dento del div
        let titulo = document.createElement('h2')
        let descripcion = document.createElement('p')
        let fecha = document.createElement('p')
        let autor = document.createElement('p')
        let enlaces = ['Spotify', 'YouTube', 'Apple', 'Amazon']

        //Portada
        portada.src = data.Canciones[i].Portada
        portada.alt = data.Canciones[i].Titulo
        portada.classList.add('portada')
        articulo.appendChild(portada)

        //Divisor
        articulo.appendChild(divisor)

        //Titulo
        titulo.innerHTML = data.Canciones[i].Titulo

        divisor.appendChild(titulo)

        //Descripcion
        descripcion.innerHTML = data.Canciones[i].Descripcion

        divisor.appendChild(descripcion)

        //Fecha
        fecha.innerHTML = data.Canciones[i].Fecha

        divisor.appendChild(fecha)

        //Autor
        autor.innerHTML = data.Canciones[i].Autor

        divisor.appendChild(autor)

        //DivisorEnlaces
        divisor.appendChild(divisorEnlaces)
        divisorEnlaces.classList.add('IconosCanciones')
        //Enlaces
        for (let j = 0; j < data.Canciones[i].Enlaces.length; j++) {
          let enlace = document.createElement('a')
          enlace.href = data.Canciones[i].Enlaces[j]
          let img = document.createElement('img')
          img.src = '../ico/' + enlaces[j] + '.png'
          img.alt = enlaces[j]
          enlace.appendChild(img)

          divisorEnlaces.appendChild(enlace)
        }

        seccionPadre.appendChild(articulo)
      }
    })
})
