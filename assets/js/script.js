formEl = document.querySelector("#search-form");
btnEl= document.getElementById("start-btn");
console.log(btnEl);
var taskFormHandler = function () {
    event.preventDefault();
    var timeRangeInput = document.querySelector("select[name='timeRange']").value;
    var cityInput = document.querySelector("input[name='city']").value;
    
    console.log(timeRangeInput);
    console.log(cityInput);
    // check if input values are empty strings
    if (!timeRangeInput || !cityInput) {
        alert("You need to fill out the search form!");
        return false;
    }
    
    btnEl.href = "./main.html?city=" + cityInput;  
    // Redirect to event page
    // window.location.href = 'team.html';
};

function initialize() {
    var options = {
        types: ['(cities)'],
        componentRestrictions: {country: "us"}
    };
    var input = document.getElementById('city');
    new google.maps.places.Autocomplete(input, options);
};

google.maps.event.addDomListener(window, "load", initialize);

formEl.addEventListener("submit", taskFormHandler);