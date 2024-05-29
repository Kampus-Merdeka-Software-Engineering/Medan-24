document.addEventListener("DOMContentLoaded", function () {
  var xmlhttp = new XMLHttpRequest();
  var url = "../json/most_ordered_size.json";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
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
          maintainAspectRatio: true,
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
    }
  };
});