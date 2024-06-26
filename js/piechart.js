var url = "./json/most_category.json";
fetch(url)
  .then(response => response.json())
  .then(data => {
    var categoryColors = {
      "Classic": "#F10096",
      "Supreme": "#0072F0",
      "Veggie": "#F66D00",
      "Chicken": "#00B6CB"
    };
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
            backgroundColor: category.map(function(cat) { return categoryColors[cat]; }),
            borderColor: category.map(function(cat) { return categoryColors[cat]; }),
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    document.getElementById('category').addEventListener('change', function () {
      var selectedCategory = this.value;
      var filteredData = data.most_category.filter(function (elem) {
        return elem.Category === selectedCategory;
      });

      if (selectedCategory === "All") {
        filteredData = data.most_category;
      } else {
        filteredData = data.most_category.filter(function (elem) {
          return elem.Category === selectedCategory;
        });
      }

      pieChart.data.labels = filteredData.map(function (elem) {
        return elem.Category;
      });
      pieChart.data.datasets[0].data = filteredData.map(function (elem) {
        return elem.Total_Order;
      });
      pieChart.data.datasets[0].backgroundColor = filteredData.map(function (elem) {
        return categoryColors[elem.Category];
      });
      pieChart.data.datasets[0].borderColor = filteredData.map(function (elem) {
        return categoryColors[elem.Category];
      });

      pieChart.update();
    });
  })
  .catch(error => console.error('Error fetching data:', error));
