document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = document.getElementById('search').value;
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
        optimizedSearch += ` -controversy`;
        searchUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(optimizedSearch)}`;
    } else if (source === 'pubmed') {
        searchUrl = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;
    } else if (source === 'jstor') {
        searchUrl = `https://www.jstor.org/action/doBasicSearch?Query=${encodeURIComponent(query)}`;
    } else if (source === 'IEEE_Xplore') {
        searchUrl = `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${encodeURIComponent(query)}`;
    } else if (source === 'Web_of_Science') {
        searchUrl = `https://www.webofscience.com/wos/woscc/summary/=${encodeURIComponent(query)}`;
    } else if (source === 'wikipedia') {
        // Wikipedia search
        searchUrl = `https://es.wikipedia.org/wiki/Especial:Buscar?search=${encodeURIComponent(query)}`;
    }

    chrome.tabs.create({ url: searchUrl });
    document.getElementById('optimizedSearch').innerText = `Optimized Search: ${optimizedSearch}`;
});

document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
