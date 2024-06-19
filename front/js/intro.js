document.addEventListener('DOMContentLoaded', (event) => {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');
  
    // Espera hasta que la animación de la lupa termine
    setTimeout(() => {
      intro.style.display = 'none';
      mainContent.style.display = 'block';
    }, 2500); // Duración de la animación en milisegundos (2s)
  });

  // Enviar URL a la API para obtener la calificación de confiabilidad al iniciar la extensión
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;
    fetch('http://127.0.0.1:5000/get_trust_score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: currentUrl }),
    })
    .then(response => response.json())
    .then(data => {
      const trustScore = data.trust_score; // Obtener la calificación de confiabilidad
      const confidenceBar = document.getElementById('confidence-bar');
      
      // Actualizar la barra de confiabilidad con la calificación recibida
      confidenceBar.style.width = trustScore + '%';
      if (trustScore > 8) {
        confidenceBar.style.backgroundColor = 'green';
      } else if (trustScore > 5) {
        confidenceBar.style.backgroundColor = 'yellow';
      } else {
        confidenceBar.style.backgroundColor = 'red';
      }
    })
    .catch(error => console.error('Error:', error));
  });

    // Solicitar resumen y verificar la confiabilidad de la URL
    document.getElementById('summary-button').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: getSummary
        }, (results) => {
          let summaryContent = results[0].result;
          getResponse(summaryContent);
  
          // Verificar la confiabilidad de la URL al pedir el resumen
          const currentUrl = tabs[0].url;
          fetch('http://127.0.0.1:5000/get_trust_score', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: currentUrl }),
          })
          .then(response => response.json())
          .then(data => {
            const trustScore = data.trust_score; // Obtener la calificación de confiabilidad
            const confidenceBar = document.getElementById('confidence-bar');
            
            // Actualizar la barra de confiabilidad con la calificación recibida
            confidenceBar.style.width = trustScore + '%';
            if (trustScore > 8) {
              confidenceBar.style.backgroundColor = 'green';
            } else if (trustScore > 5) {
              confidenceBar.style.backgroundColor = 'yellow';
            } else {
              confidenceBar.style.backgroundColor = 'red';
            }
          })
          .catch(error => console.error('Error:', error));
        });
      });
    });