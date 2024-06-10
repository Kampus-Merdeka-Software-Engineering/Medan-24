document.addEventListener("DOMContentLoaded", function () {
  var url = "./json/most_ordered_size.json";
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      var pizza_size = data.size.map(function (elem) {
        return elem.Pizza_Size;
      });

      var total_orders = data.size.map(function (elem) {
        return elem.Total_Order;
      });

      const ctx = document.getElementById("barChart");

      var chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: pizza_size,
          datasets: [
            {
              label: "Total Order",
              data: total_orders,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      document.getElementById('pizzaSizeSelect').addEventListener('change', function () {
        var selectedSize = this.value;

        if (selectedSize === "All") {
          chart.data.labels = pizza_size;
          chart.data.datasets[0].data = total_orders;
        } else {
          var filteredData = data.size.filter(function (elem) {
            return elem.Pizza_Size === selectedSize;
          });

          chart.data.labels = filteredData.map(function (elem) {
            return elem.Pizza_Size;
          });
          chart.data.datasets[0].data = filteredData.map(function (elem) {
            return elem.Total_Order;
          });
        }

        chart.update();
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});