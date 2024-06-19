document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = document.getElementById('search').value; // Cambiado de 'query' a 'search'
    const filetype = document.getElementById('filetype').value;
    const source = document.getElementById('source').value;

    let optimizedSearch = `${query}`;
    let searchUrl = "";

    if (source === 'google') {
        optimizedSearch += ` filetype:${filetype}`;
        optimizedSearch += ` -controversy`;
        optimizedSearch += ` site:edu`;
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(optimizedSearch)}`;
    } else if (source === 'scholar') {
        // Google Scholar no soporta filetype:
        optimizedSearch += ` -controversy`;
        searchUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(optimizedSearch)}`;
    } else if (source === 'pubmed') {
        // PubMed tampoco soporta filetype: ni la mayoría de los operadores de búsqueda avanzada
        searchUrl = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;
    } else if (source === 'jstor') {
        // JSTOR no soporta operadores como filetype:
        searchUrl = `https://www.jstor.org/action/doBasicSearch?Query=${encodeURIComponent(query)}`;
    } else if (source === 'IEEE_Xplore') {
        // IEEE Xplore no soporta operadores como filetype:
        searchUrl = `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${encodeURIComponent(query)}`;
    } else if (source === 'Web_of_Science') {
        // Web of Science no soporta operadores como filetype:
        searchUrl = `https://www.webofscience.com/wos/woscc/summary/=${encodeURIComponent(query)}`;
    }

    chrome.tabs.create({ url: searchUrl });
    document.getElementById('optimizedSearch').innerText = `Optimized Search: ${optimizedSearch}`;
});