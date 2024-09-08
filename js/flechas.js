document.addEventListener('DOMContentLoaded', () => {
  // Asegurarse de que el contenido de flechas.html esté cargado
  const scrollDownArrow = document.querySelector('.flecha-scroll-down')

    if (scrollDownArrow) {
    // Detectar el scroll para ocultar la flecha con fade-out
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        scrollDownArrow.classList.add('hidden')
      } else {
        scrollDownArrow.classList.remove('hidden')
      }
    })
  }
})
