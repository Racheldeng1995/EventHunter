
btnEl= document.getElementById("start-btn");
btnBl= document.getElementById("generate")

// Add click event on 'Get Started' button to direct the app main page to event main page
btnBl.onclick = function () {
    var timeRangeInput = document.getElementById("timeRange").value;
    var cityInput = document.getElementById("city").value;
    console.log(timeRangeInput);
    console.log(cityInput);
    btnEl.href = "./eventmain.html?city=" + cityInput+ "&timerange=" + timeRangeInput;
}


