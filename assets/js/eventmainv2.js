
var APIToken = "ZK55TMREDURZKUJDZZ64"

var backBtn = document.getElementById("back-btn")

var eventSumList = [
    {
        eventid: "335539506697",
        timerange: "1 Week",
        city: "Los Angeles"
    },
    {
        eventid: "345788401417",
        timerange: "1 Day",
        city: "Los Angeles"
    },
    {
        eventid: "164264538657",
        timerange: "1 Day",
        city: "Los Angeles"
    },
    {
        eventid: "338509329517",
        timerange: "1 Month",
        city: "Los Angeles"
    },
    {
        eventid: "345885140767",
        timerange: "1 Month",
        city: "Los Angeles"
    },
    {
        eventid: "273338461697",
        timerange: "1 Week",
        city: "Los Angeles"
    },
    {
        eventid: "158477547611",
        timerange: "1 Day",
        city: "New York"
    },
    {
        eventid: "261458879547",
        timerange: "1 Day",
        city: "New York"
    },
    {
        eventid: "238638152137",
        timerange: "1 Week",
        city: "New York"
    },
    {
        eventid: "291803059807",
        timerange: "1 Week",
        city: "New York"
    },
    {
        eventid: "297996614897",
        timerange: "1 Month",
        city: "New York"
    },
    {
        eventid: "83802263827",
        timerange: "1 Month",
        city: "New York"
    }
]

var getSearchPara = function () {

    var queryString = document.location.search;
    console.log(queryString)
    var cityName = queryString.split("=")[1].split("&")[0].replace("%20", " ");
    console.log(cityName)
    var timeRange = queryString.split("=")[2].replace("_", " ")
    console.log(timeRange)
      
    return [cityName,timeRange]
}

var disArray = eventSumList.filter(function(obj) {
    var paraLi = getSearchPara()
    return obj.timerange == paraLi[1] && obj.city == paraLi[0]; //hard code

});


var getEventSum = function (eventId) {
    var eventApiUrl = "https://www.eventbriteapi.com/v3/events/" + eventId   + "/?token=" + APIToken

    return fetch (eventApiUrl)
    .then (function (response) {
        if (response.ok) {              
            return response.json()
        }
        else {
            alert('Error: Event Not Found');
          }
    })
    .then(function(data) {
        var eventDetails={
            "event_id": data.id,
            "logo_img": data.logo.url,
            "title": data.name.text,
            "time": moment(data.start.local).format('MMMM Do YYYY, h:mm:ss a'),
            "location_id": data.venue_id
        }
        return eventDetails
    })
    .catch(function(error) {
        alert("Unable to connect to API");
      });
}

var getAddress = function(eventId) {

    return getEventSum(eventId)
    .then(function(eventDetails) {

        var eventVenueUrl =  "https://www.eventbriteapi.com/v3/" + "venues/"  + eventDetails.location_id + "/?token=" + APIToken
        return fetch(eventVenueUrl)
        .then (function (response) {
            if (response.ok) {              
                return response.json()
            }
            else {
                alert('Error: Event Not Found');
              }
        })
        .then(function(data) {
            var eventLocation = {
                "address": data.address.localized_address_display,
            }
            console.log(eventLocation)

            return eventLocation
        })

    .catch(function(error) {
        alert("Unable to connect to API");
    });
    }
    )
}

// Combine event details in single array
var comSum = function (eventId) {

    return getEventSum(eventId)
    .then(function(eventDetails) {
        return getAddress(eventId)
        .then(function(eventLocation) {

                var eventSumArray = Object.assign(eventDetails,eventLocation)
                console.log(eventSumArray)
                return eventSumArray
            })
            }
        )
}


var savedItems = JSON.parse(localStorage.getItem("savedlist"))

if (savedItems == null) {
    var num = 0
}
else {
    var num = savedItems.length
}

var eventsLikedNum = document.getElementById("events-you-liked")

// Automatically display current number of events you liked
var genEventsNum = function () {

    var savedList = document.createElement("a")
    savedList.href = "./savedlist.html"
    savedList.innerHTML = "Events you liked: " + num
    eventsLikedNum.appendChild(savedList)
}

genEventsNum()

var eventsTimeRange = document.getElementById("events-time")

// Automatically display current number of events you liked
var genEventsTimeRange = function () {

    eventsTimeRange.innerHTML = "Time Range: " + disArray[0]["timerange"]
}

genEventsTimeRange()

var eventsCity = document.getElementById("events-location")

// Automatically display current number of events you liked
var genEventsCity = function () {

    eventsCity.innerHTML = "City: " + disArray[0]["city"]
}

genEventsCity()


// Generate and display saved events list
var geneventSumArray = function(eventId) {

    return comSum(eventId)
    .then(function(eventSumArray) {
    var eventBlock = document.createElement ("section")
    eventBlock.className = "event-block"
    var eventTitle = document.createElement("h3")
    eventTitle.innerHTML = eventSumArray.title

    var eventImg = document.createElement("a")
    eventImg.href = "./eventdesc.html?eventid=" + eventSumArray.event_id
    var eventImgEl = document.createElement("img")
    eventImgEl.src = eventSumArray.logo_img
    eventImgEl.className = "event-block-img"
    eventImg.appendChild(eventImgEl)
    var eventTime = document.createElement("p")
    eventTime.innerHTML = eventSumArray.time
    var eventLocation = document.createElement("p")
    eventLocation.innerHTML = eventSumArray.address

    eventBlock.appendChild(eventTitle)
    eventBlock.appendChild(eventImg)
    eventBlock.appendChild(eventTime)
    eventBlock.appendChild(eventLocation)

    eventSavedMain.appendChild(eventBlock)

    }
    )
}

// Loop though all the items from array on local storage
var eventSavedMain = document.getElementById("event-main")
for (i=0; i < disArray.length; i++) {
    (function(i) {
        console.log(disArray[i]['eventid'])
        geneventSumArray(disArray[i]['eventid'])
        
    }(i)
    )
}

backBtn.addEventListener("click", function(event) {

    event.preventDefault();
    window.history.go(-1)

}

)

