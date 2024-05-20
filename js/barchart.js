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

    new Chart(ctx, {
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
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
};