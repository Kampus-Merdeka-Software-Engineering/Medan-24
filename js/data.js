let data = [];
const rowsPerPage = 7;
let currentPage = 1;
let selectedCategory = "All";

fetch('./json/most_ordered_pizza2.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        data = data.map(item => {
            return {
                ...item,
                Revenue: parseFloat(item.Revenue.replace(/[$,]/g, '')) // Mengubah Revenue menjadi number
            };
        });
        sortDataByRevenue();
        displayTable(currentPage);
    })
    .catch(error => console.error('Error fetching data:', error));

function sortDataByRevenue() {
    data.sort((a, b) => b.Revenue - a.Revenue);
}

function displayTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const filteredData = data.filter(item => selectedCategory === "All" || item.Category === selectedCategory);

    const paginatedData = filteredData.slice(start, end);

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    paginatedData.forEach(row => {
        const tr = document.createElement('tr');

        const columns = ['Pizza_Name', 'Total_Order', 'Revenue'];

        columns.forEach(column => {
            const td = document.createElement('td');
            if (column === 'Revenue') {
                td.textContent = `$${row[column].toLocaleString()}`;
            } else {
                td.textContent = row[column];
            }
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });

    document.getElementById('page-info').textContent = `${page} of ${Math.ceil(filteredData.length / rowsPerPage)}`;
    document.getElementById('prev').classList.toggle('disabled', page === 1);
    document.getElementById('next').classList.toggle('disabled', page === Math.ceil(filteredData.length / rowsPerPage));
}

function nextPage() {
    const totalPages = Math.ceil(data.filter(item => selectedCategory === "All" || item.Category === selectedCategory).length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTable(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTable(currentPage);
    }
}

document.getElementById('category').addEventListener('change', function () {
    selectedCategory = this.value;
    currentPage = 1;
    displayTable(currentPage);
});
