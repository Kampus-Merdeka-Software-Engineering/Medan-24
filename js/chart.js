document.addEventListener("DOMContentLoaded", function () {
  var xmlhttp = new XMLHttpRequest();
  var url = "../json/monthly_revenue.json";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var months = data.monthly.map(function (elem) {
        return elem.month;
      });

      var total = data.monthly.map(function (elem) {
        return elem.total_revenue;
      });

      var ctx = document.getElementById("canvas");

      var chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: months,
          datasets: [
            {
              label: "Revenue",
              data: total,
              backgroundColor: "transparent",
              fill: false,
              borderColor: "blue",
              borderWidth: 2,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      document.getElementById('filter-button').addEventListener('click', function() {
        updateChart(chart, data);
      });
      
      function updateChart(chart, data) {
        var startDate = new Date(document.getElementById('start-date').value);
        var endDate = new Date(document.getElementById('end-date').value);
      
        if (isNaN(startDate) || isNaN(endDate)) {
          alert("Please select valid start and end dates.");
          return;
        }
      
        var filteredData = data.monthly.filter(function (elem) {
          var elemDate = new Date(elem.month + '-01'); 
          return elemDate >= startDate && elemDate <= endDate;
        });
      
        var filteredMonths = filteredData.map(function (elem) {
          return elem.month;
        });
      
        var filteredRevenue = filteredData.map(function (elem) {
          return elem.total_revenue;
        });
      
        chart.data.labels = filteredMonths;
        chart.data.datasets[0].data = filteredRevenue;
        chart.update();
      }
      
    }
  };
});

