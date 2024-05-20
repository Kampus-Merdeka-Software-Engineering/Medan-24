var xmlhttp = new XMLHttpRequest();
var url = "../json/most_category.json";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    var category = data.most_category.map(function (elem) {
      return elem.Category;
    });

    var total_orders = data.most_category.map(function (elem) {
      return elem.Total_Order;
    });

    var pieCtx = document.getElementById("pieChart").getContext("2d");
    var pieChart = new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: category,
        datasets: [
          {
            label: "Total Orders",
            data: total_orders,
            backgroundColor: [
                '#F10096',
                '#0072F0',
                '#F66D00',
                '#00B6CB'
            ],
            borderColor: [
                '#F10096',
                '#0072F0',
                '#F66D00',
                '#00B6CB'
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true
      },
    });
  }
};
