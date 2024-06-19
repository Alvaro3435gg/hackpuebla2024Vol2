// document.getElementById('summary-button').addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             function: getSummary
//         }, (results) => {
//             document.getElementById('summary').innerText = results[0].result;
//         });
//     });
// });
//
// function getSummary() {
//     // Captura el contenido de la página (puedes personalizar esta parte según tus necesidades)
//     return document.body.innerText;
// }
