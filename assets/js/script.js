formEl = document.querySelector("#search-form");
btnEl= document.getElementById("start-btn");
btnBl= document.getElementById("generate")

console.log(btnEl);
// var taskFormHandler = function () {
    
//     //var timeRangeInput = document.querySelector("select[name='timeRange']").value;
//     var timeRangeInput = document.getElementById("timeRange").value;
//     var cityInput = document.getElementById("city").value;

//     console.log(timeRangeInput);
//     console.log(cityInput);
// // check if input values are empty strings
// // if (!timeRangeInput || !cityInput) {
// //     alert("You need to fill out the search form!");
// //     return false;
// // }
//     console.log("here")
//     btnEl.href = "./eventmainv2.html?city=" + cityInput+ "&timerange=" + timeRangeInput; //real code 
// // btnEl.onclick = function () {
// //     location.href = "./eventmainv2.html?city=" + "Los Angeles"+ "&timerange=" + "1 Week";  //test purpose
// // };
//     // Redirect to event page
//     // window.location.href = 'team.html';
//  };

// btnBl.addEventListener("click", taskFormHandler());
//taskFormHandler()

// function initialize() {
//     var options = {
//         types: ['(cities)'],
//         componentRestrictions: {country: "us"}
//     };
//     var input = document.getElementById('city');
//     new google.maps.places.Autocomplete(input, options);
// };

// google.maps.event.addDomListener(window, "load", initialize);


btnBl.onclick = function () {
    var timeRangeInput = document.getElementById("timeRange").value;
    var cityInput = document.getElementById("city").value;
    console.log(timeRangeInput);
    console.log(cityInput);
    btnEl.href = "./eventmainv2.html?city=" + cityInput+ "&timerange=" + timeRangeInput;
}


