document.addEventListener("DOMContentLoaded", function () {
  var xmlhttp = new XMLHttpRequest();
  var url = "./json/monthly_revenue.json";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var months = data.monthly.map(function (elem) {
        return elem.month;
      });

      var total = data.monthly.map(function (elem) {
        return parseFloat(elem.total_revenue); // Ensure revenue is a number
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
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      document.getElementById('filter-button').addEventListener('click', function () {
        updateChart(chart, data);
      });

      function updateChart(chart, data) {
        var startDate = new Date(document.getElementById('start-date').value);
        var endDate = new Date(document.getElementById('end-date').value);

        if (isNaN(startDate) || isNaN(endDate)) {
          alert("Please select valid start and end dates.");
          return;
        }

        // Check if the selected dates are within the year 2015
        if (startDate.getFullYear() !== 2015 || endDate.getFullYear() !== 2015) {
          alert("Please select dates within the year 2015.");
          return;
        }

        var filteredData = data.monthly.filter(function (elem) {
          var elemDate = parseMonthYear(elem.month);
          console.log('startDate:', startDate);
          console.log('endDate:', endDate);
          console.log('elemDate:', elemDate);
          return elemDate >= startDate && elemDate <= endDate;
        });

        console.log('filteredData:', filteredData); // Log filtered data

        var filteredMonths = filteredData.map(function (elem) {
          return elem.month;
        });

        var filteredRevenue = filteredData.map(function (elem) {
          return parseFloat(elem.total_revenue); // Ensure revenue is a number
        });

        chart.data.labels = filteredMonths;
        chart.data.datasets[0].data = filteredRevenue;
        chart.update();
      }

      function parseMonthYear(monthYearStr) {
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];
        const [month, year] = monthYearStr.split(' ');
        const monthIndex = monthNames.indexOf(month);
        const date = new Date(year, monthIndex, 0);
        console.log('Parsed date for', monthYearStr, ':', date);
        return date;
      }
    }
  };
});
