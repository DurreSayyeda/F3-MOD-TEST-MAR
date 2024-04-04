// script.js
const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(crypto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${crypto.image}" alt="${crypto.name}" width="30"></td>
            <td>${crypto.name}</td>
            <td>${crypto.symbol}</td>
            <td>${crypto.current_price}</td>
            <td>${crypto.total_volume}</td>
        `;
        tableBody.appendChild(row);
    });
}

async function search() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const data = await fetchData();

    const filteredData = data.filter(crypto => {
        return crypto.name.toLowerCase().includes(searchTerm) || crypto.symbol.toLowerCase().includes(searchTerm);
    });

    renderTable(filteredData);
}

function sortByMarketCap() {
    fetchData().then(data => {
        const sortedData = data.sort((a, b) => b.market_cap - a.market_cap);
        renderTable(sortedData);
    });
}

function sortByPercentageChange() {
    fetchData().then(data => {
        const sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderTable(sortedData);
    });
}

// Initial rendering
fetchData().then(data => renderTable(data));
