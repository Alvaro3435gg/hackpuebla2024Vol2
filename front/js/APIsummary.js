document.addEventListener('DOMContentLoaded', (event) => {
    // Botón para obtener el resumen
    document.getElementById('summary-button').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: getSummary
            }, (results) => {
                let summaryContent = results[0].result;
                getResponse(summaryContent);
            });
        });
    });

    // Botón para hablar el resumen
    document.getElementById('speak-summary').addEventListener('click', () => {
        let summaryText = document.getElementById('summary').innerText;
        speakText(summaryText);
    });

    // Enviar feedback al presionar Enter
    document.getElementById('feedbackInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let feedbackText = event.target.value;
            let summary = getSummary();
            sendFeedback(feedbackText, summary);
        }
    });

    // Realiza la solicitud fetch para veracidad al cargar la página
    fetchVeracity();
});

function getSummary() {
    // Captura el contenido de la página (puedes personalizar esta parte según tus necesidades)
    return document.body.innerText;
}

function getResponse(summaryContent) {
    fetch('http://127.0.0.1:5000/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ summary: summaryContent }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('summary').innerText = data.response;
            document.getElementById('feedback-form').style.display = 'block'; // Muestra el formulario de feedback
        })
        .catch(error => console.error('Error:', error));
}

function sendFeedback(feedbackText, summary) {
    fetch('http://127.0.0.1:5000/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback: feedbackText, content: summary }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('summary').innerText = data.response;
        })
        .catch(error => console.error('Error:', error));
}

function fetchVeracity() {
    let summaryContent = getSummary(); // Obtiene el resumen actual

    fetch('http://127.0.0.1:5000/veracity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ summary: summaryContent }), // Enviar el resumen al servidor
    })
        .then(response => response.json())
        .then(data => {
            // Suponiendo que recibes un valor de porcentaje en data.response (por ejemplo, "54%")
            let percentage = parseInt(data.response, 10);

            // Seleccionar el elemento con la clase .confidence-meter div
            let confidenceMeter = document.querySelector('.confidence-meter div');

            // Aplicar el ancho calculado dinámicamente y ajustar el color
            confidenceMeter.style.width = percentage + '%';
            if (percentage >= 0 && percentage <= 20) {
                confidenceMeter.style.backgroundColor = 'red';
            } else if (percentage >= 21 && percentage <= 40) {
                confidenceMeter.style.backgroundColor = 'orange';
            } else if (percentage >= 41 && percentage <= 60) {
                confidenceMeter.style.backgroundColor = 'yellow';
            } else if (percentage >= 61 && percentage <= 80) {
                confidenceMeter.style.backgroundColor = 'lightgreen';
            } else if (percentage >= 81 && percentage <= 100) {
                confidenceMeter.style.backgroundColor = 'green';
            }
        })
        .catch(error => console.error('Error:', error));
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES'; // Establece el idioma de la síntesis de voz a español de España
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('Tu navegador no soporta la síntesis de voz.');
    }
}
