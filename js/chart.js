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

    }
  };
});
