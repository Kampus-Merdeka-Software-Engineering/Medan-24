let data = [];
    const rowsPerPage = 8;
    let currentPage = 1;

    fetch('../json/most_ordered_pizza.json')
        .then(response => response.json())
        .then(json => {
            data = json;
            displayTable(currentPage);
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayTable(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);

        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';

        paginatedData.forEach(row => {
            const tr = document.createElement('tr');
            for (key in row) {
                const td = document.createElement('td');
                td.textContent = row[key];
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        });

        document.getElementById('page-info').textContent = `${page} of ${Math.ceil(data.length / rowsPerPage)}`;
        document.getElementById('prev').classList.toggle('disabled', page === 1);
        document.getElementById('next').classList.toggle('disabled', page === Math.ceil(data.length / rowsPerPage));
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
    