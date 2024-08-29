document.addEventListener("DOMContentLoaded", function() {
    fetch('../musica/musica.json')
        .then(response => response.json())
        .then(data => {
            let seccionPadre = document.getElementById('musica');
            for(let i = 0; i < data.Canciones.length; i++) {
                //Cuadradito donde va
                let articulo = document.createElement('article');

                //Info de la cancion
                let titulo = document.createElement('h2');
                let descripcion = document.createElement('p');
                let fecha = document.createElement('p');
                let autor = document.createElement('p');
                let portada = document.createElement('img');
                let enlaces = ["Spotify", "YouTube", "Apple", "Amazon"];

                //Titulo
                titulo.innerHTML = data.Canciones[i].Titulo;

                articulo.appendChild(titulo);

                //Descripcion
                descripcion.innerHTML = data.Canciones[i].Descripcion;

                articulo.appendChild(descripcion);

                //Fecha
                fecha.innerHTML = data.Canciones[i].Fecha;

                articulo.appendChild(fecha);

                //Autor
                autor.innerHTML = data.Canciones[i].Autor;

                articulo.appendChild(autor);

                //Portada
                portada.src = data.Canciones[i].Portada;
                portada.alt = data.Canciones[i].Titulo;

                articulo.appendChild(portada);

                //Enlaces
                for(let j = 0; j < data.Canciones[i].Enlaces.length; j++) {
                    let enlace = document.createElement('a');
                    enlace.href = data.Canciones[i].Enlaces[j];
                    enlace.innerHTML = enlaces[j];

                    articulo.appendChild(enlace);
                }

                seccionPadre.appendChild(articulo);
            };
        });
});
