function fetchJSONData() {
    fetch("../json/monthly_revenue.json")
        .then((Response) => {
            if (!Response.ok){
                throw new Error(`HTTP error: ${Response.status}`);
            }
            return Response.json();
        })
        .then((data) =>
            console.log(data))
        .catch((error) => 
            console.error("Unable to fetch JSON data:", error));
}
fetchJSONData();