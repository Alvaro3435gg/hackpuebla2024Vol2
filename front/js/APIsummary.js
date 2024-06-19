document.addEventListener('DOMContentLoaded', (event) => {
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

    document.getElementById('speak-summary').addEventListener('click', () => {
        let summaryText = document.getElementById('summary').innerText;
        speakText(summaryText);
    });
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