export default {
  openWeatherAPI(pos, cb){
    let req = new XMLHttpRequest();
    // req.addEventListener("load", cb);
    req.open("GET", `http://api.openweathermap.org/data/2.5/weather?lat=${
      pos.coords.latitude/*37.7749*/
    }&lon=${
      pos.coords.longitude/*122.4194*/
    }&APPID=2f907066b391c3e5bae0d372452eafe2`, true);
    req.onload = function() {
      if (req.status >= 200 && req.status < 400) {
        // Success!
        var resp = JSON.parse(req.responseText);
        cb(resp);
      } else {
        // We reached our target server, but it returned an error
        window.apiProblem = req;
        console.log(req);
        alert("Check console");
      }
    };
    req.send();
  }
};
