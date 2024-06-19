document.addEventListener('DOMContentLoaded', (event) => {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
  
    // Espera hasta que la animación de la lupa termine
    setTimeout(() => {
      intro.style.display = 'none';
      mainContent.style.display = 'block';
    }, 2500); // Duración de la animación en milisegundos (2s)
  });