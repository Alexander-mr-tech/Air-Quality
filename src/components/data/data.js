import axios from "axios";

useEffect(() => {
  axios
    .get("https://example.com/api/heatmap-data")
    .then((response) => {
      const data = response.data;
      const formattedData = data.map((item) => ({
        location: new window.google.maps.LatLng(item.lat, item.lng),
        weight: item.weight || 1,
      }));
      setHeatmapData(formattedData);
    })
    .catch((error) => console.error("Error fetching heatmap data:", error));
}, []);
