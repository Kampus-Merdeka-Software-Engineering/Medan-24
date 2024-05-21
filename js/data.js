let data = [];
const rowsPerPage = 8;
let currentPage = 1;
let selectedCategory = "All"; // Inisialisasi kategori yang dipilih

fetch('../json/most_ordered_pizza2.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        displayTable(currentPage);
    })
    .catch(error => console.error('Error fetching data:', error));

function displayTable(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // Filter data berdasarkan kategori yang dipilih
    const filteredData = data.filter(item => selectedCategory === "All" || item.Category === selectedCategory);

    const paginatedData = filteredData.slice(start, end);

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    paginatedData.forEach(row => {
        const tr = document.createElement('tr');

        const columns = ['Pizza_Name', 'Total_Order', 'Revenue'];

        columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = row[column];
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });

    document.getElementById('page-info').textContent = `${page} of ${Math.ceil(filteredData.length / rowsPerPage)}`;
    document.getElementById('prev').classList.toggle('disabled', page === 1);
    document.getElementById('next').classList.toggle('disabled', page === Math.ceil(filteredData.length / rowsPerPage));
}

function nextPage() {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
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

// Event listener untuk perubahan dropdown kategori
document.getElementById('category').addEventListener('change', function () {
    selectedCategory = this.value; // Menyimpan kategori yang dipilih
    currentPage = 1; // Reset halaman ke halaman pertama
    displayTable(currentPage); // Menampilkan tabel dengan kategori yang dipilih
});
