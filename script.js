$(document).ready(function() {
  var api = "https://fcc-weather-api.glitch.me/api/current?";
  var lat;
  var lon;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log(pos.coords.latitude)
      lat = "lat=" + pos.coords.latitude;
      lon = "lon=" + pos.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    alert("Location services is not supported in your current browser");
  }
  function getWeather(lat, lon) {
    var fccapi = api + lat + "&" + lon;
    $.getJSON(fccapi, function(result) {
      var temp = result.main.temp;
      var temSwap = false;
      var fTemp = Math.floor((temp * 1.8) + 32);    //((temp * 1.8) + 32).toFixed();
      var cTemp = Math.floor(temp);  //centigrate code: &#8451;/fahrenheit code: &#8457;
      
      $("#tUn").on("click", function() {
        if (temSwap) {
          $("#myTemp").html(cTemp);
          $("#tUn").html(" &#8451;");
          temSwap = false;
        }else if (temSwap === false) {
          $("#myTemp").html(fTemp);
          $("#tUn").html(" &#8457;");
          temSwap = true;
        }
      });
      //https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F09d.png?1499366021170
      $("#myLoc").text(result.name+",");
      $("#myCou").text(result.sys.country+".");
      $("#myTemp").html(cTemp);
      $("#tUn").html(" &#8451;")
      $(".wIcon").html("<img src='" + result.weather[0].icon + "'>")
      $(".wDes").html(result.weather[0].main);
      //console.log(result.weather[0].main);
      var wMain = result.weather[0].main;
      //console.log(wMain);
      chBackG(wMain);
      
    })
  }
  function chBackG(wMain) {
    var wwMain = wMain.toLowerCase();
    //console.log(wwMain)
    switch (wwMain) {
      case "clouds" :
        $("body").css("background-image", "url('https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_960_720.jpg')");
        break;
      case "drizzle" :
        $("body").css("background-image", "url('https://cdn.pixabay.com/photo/2017/08/06/08/39/rain-2590345_960_720.jpg')");
        break;
      case "thunderstorm" :
        $("body").css("background-image", "url('https://cdn.pixabay.com/photo/2017/08/01/22/38/flash-2568381_960_720.jpg')");
        break;
      case "rain" :
        $("body").css("background-image", "url('https://cdn.pixabay.com/photo/2017/08/13/20/53/rainy-2638542_960_720.jpg')");
        break;
      case "clear" :
        $("body").css("background-image", "url('https://cdn.pixabay.com/photo/2017/05/07/21/38/sky-2293737_960_720.jpg')");
        break;
      case "snow" :
        $("body").css("background-image", "url('https://cdn.pixabay.com/photo/2017/10/25/22/22/background-2889551_960_720.png')");
        break;
      case "mist" :
        $("body").css("background-image", "url('https://cdn.pixabay.com/photo/2016/02/24/18/37/fog-1220491_960_720.jpg')");
        break;
        default :
        $("body").css("background-color", "black");
    }
  }
});