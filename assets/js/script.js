formEl = document.querySelector("#search-form");

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
    
    // Redirect to event page
    window.location.href = 'team.html';
};

formEl.addEventListener("submit", taskFormHandler);
