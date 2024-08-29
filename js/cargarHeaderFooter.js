document.addEventListener("DOMContentLoaded", function() {
    // Cargar el header y limpiar cualquier contenido existente para evitar duplicaciones
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = ''; // Asegura que el header esté vacío
            document.querySelector('header').innerHTML = data;
        });

    // Cargar el footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = ''; // Asegura que el footer esté vacío
            document.querySelector('footer').innerHTML = data;
        });
});