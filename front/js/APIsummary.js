document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('summary-button').addEventListener('click', getResponse);
});

function getResponse() {
    fetch('http://127.0.0.1:5000/get_response')
        .then(response => response.json())
        .then(data => {
            document.getElementById('summary').innerText = data.response;
        })
        .catch(error => console.error('Error:', error));
}
