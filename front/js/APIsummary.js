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
