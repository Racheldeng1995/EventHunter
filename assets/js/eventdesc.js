var APIToken = "ZK55TMREDURZKUJDZZ64"
var likeBtn = document.getElementById("like-btn")
var backBtn = document.getElementById("back-btn")
var backBtnText = document.getElementById("back-btn-text")

// Add event listener on Like button
// If click "Like", heart icon turns into solid color, and button text turns into "Liked"
// If click again, heart icon turns back to default color(transparent with border), and button text turns back to default text("Like")
likeBtn.addEventListener("click", function(event){

    event.preventDefault();
    var likeIcon = document.getElementById("like-icon")
    var likeValue = likeBtn.getAttribute("like-value")

    if (likeValue == "like") {
        likeIcon.className = "fa fa-heart"
        this.textContent = "Liked"
        this.setAttribute("like-value", "liked")
        }

    else {
        likeIcon.className = "fa fa-heart-o"
        this.textContent = "Like"
        this.setAttribute("like-value", "like")
        }
    }
)

// Add event listener on Back Button
// !!! Dependency on local storage of Event Main Page
// !!! Pay attention that not directly link back to Event Main Page, need to link back to "selected"/"already loaded" Event Main Page
backBtn.addEventListener("click", function(event) {

    event.preventDefault();
    backBtnText.setAttribute("href", "")

}

)

// Grab evrnt id from url query string
// !!! Dependency on href link from Event Main Page. href should be ./index.html?event=" + eventid

// var getEventId = function() {

//     var queryString = document.location.search;
//     var eventId = queryString.split("=")[1];
  
//     return eventId
//   };
 
var getEventDetails = function() {
    
    //var event = getEventDetails()
    var eventApiUrl = "https://www.eventbriteapi.com/v3/events/" + "338509329517"   + "/?token=" + APIToken

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
            "summary": data.summary,
            "logo_img": data.logo.url,
            "title": data.name.text,
            "time": moment(data.start.local).format('MMMM Do YYYY, h:mm:ss a'),
            "location_id": data.venue_id
        }
        console.log(eventDetails)
        return eventDetails
    })
    .catch(function(error) {
        alert("Unable to connect to API");
      });
}

var getLocationGeo = function() {

    return getEventDetails()
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
                "location_name": data.name,
                "lat": data.latitude,
                "lon": data.longitude
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

var getTicketPrice = function() {
    
    //var event = getEventDetails()
    var priceApiUrl = "https://www.eventbriteapi.com/v3/events/" + "345788401417/" + "ticket_classes"   + "/?token=" + APIToken

    return fetch (priceApiUrl)
    .then (function (response) {
        if (response.ok) {              
            return response.json()
        }
        else {
            alert('Error: Event Not Found');
          }
    })
    .then(function(data) {
        console.log(data)

        var ticketArray = data.ticket_classes

        var keysToKeep = ["cost", "category", "display_name", "on_sale_status"]
        var redux = array => array.map(o => keysToKeep.reduce((acc, curr) => {
            acc[curr] = o[curr];
            return acc;
        }, {}));

        var ticketDetailsArray = redux(ticketArray) 

        for (i = 0; i < ticketDetailsArray.length; i++) {
            (function(i) {
                if(ticketDetailsArray[i].cost == null) {
                    ticketDetailsArray[i].cost = "$0"
                }
                else {
                    var extrCost = ticketDetailsArray[i].cost.display
                    ticketDetailsArray[i].cost = extrCost
                }
            } (i))
        }

       var priceDetails = {
        "price" : ticketDetailsArray
       }

       console.log(priceDetails)
       return priceDetails
    })
    .catch(function(error) {
        alert("Unable to connect to API");
      });
}


var getFullDesc = function() {
    
    //var event = getEventDetails()
    var descApiUrl = "https://www.eventbriteapi.com/v3/events/" + "345788401417/" + "structured_content"   + "/?token=" + APIToken

    return fetch (descApiUrl)
    .then (function (response) {
        if (response.ok) {              
            return response.json()
        }
        else {
            alert('Error: Event Not Found');
          }
    })
    .then(function(data) {
        console.log(data)
        var eventFullDesc = {
            "fulldesc": data.modules[0].data.body.text.replace("<p>", "").replace("</p>", "")
        }

        return eventFullDesc
    })
    .catch(function(error) {
        alert("Unable to connect to API");
      });
}

//getEventDetails();
//getLocationGeo();
//getTicketPrice()

var comDetails = function () {

    return getEventDetails()
    .then(function(eventDetails) {
        return getLocationGeo()
        .then(function(eventLocation) {
            return getFullDesc()
            .then(function(eventFullDesc) {
                return getTicketPrice()
                .then(function(priceDetails) {

                var eventDetailsArray = Object.assign(eventDetails,eventLocation,eventFullDesc,priceDetails)
                console.log(eventDetailsArray)
                return eventDetailsArray
            })
            }
        )
    })
})
}

//comDetails();
var eventMainEl = document.getElementById("event-main")
genPage = function () {

    return comDetails()
    .then(function(eventDetailsArray) {
        console.log(eventDetailsArray)
        var imgSec = document.createElement("img")
        imgSec.className = "event-img"
        imgSec.src = eventDetailsArray.logo_img
        var eventDetailsMain = document.createElement("section")
        eventDetailsMain.className = "event-details-main"
        var eventName = document.createElement("p")
        eventName.className = "event-name"
        eventName.innerHTML = eventDetailsArray.title
        var eventDate = document.createElement("p")
        eventDate.className = "event-date"
        eventDate.innerHTML = eventDetailsArray.time
        var eventLocation = document.createElement("p")
        eventLocation.className = "event-location"
        eventLocation.innerHTML = eventDetailsArray.location_name
        var eventAddress = document.createElement("p")
        eventAddress.className = "event-address"
        eventAddress.innerHTML = eventDetailsArray.address

        eventDetailsMain.appendChild(eventName)
        eventDetailsMain.appendChild(eventDate)
        eventDetailsMain.appendChild(eventLocation)
        eventDetailsMain.appendChild(eventAddress)

        var eventPriceLi = document.createElement("ul")
        eventPriceLi.className = "event-price-main"
        for (j=0; j <eventDetailsArray.price.length; j++) {
            (function(j) {
                var eventPriceEl = document.createElement("li")
                eventPriceEl.className = "price-detail"
                var eventPriceCost = document.createElement("p")
                eventPriceCost.innerHTML = "Price: " + eventDetailsArray.price[j].cost
                var eventPriceName = document.createElement("p")
                eventPriceName.innerHTML = "Category: " + eventDetailsArray.price[j].display_name
                var eventPriceStatus = document.createElement("p")
                eventPriceStatus.innerHTML = "Status: " + eventDetailsArray.price[j].on_sale_status

                eventPriceEl.appendChild(eventPriceCost)
                eventPriceEl.appendChild(eventPriceName)
                eventPriceEl.appendChild(eventPriceStatus)

                eventPriceLi.appendChild(eventPriceEl)
            }(j))
        }

        var eventDescription = document.createElement("section")
        eventDescription.className = "event-desc-main"
        var eventDescHeader = document.createElement("h1")
        eventDescHeader.innerHTML = "About this event"
        var eventDescDetails = document.createElement("p")
        eventDescDetails.innerHTML = eventDetailsArray.summary
        var eventFullDescs = document.createElement("P")
        eventFullDescs.innerHTML = eventDetailsArray.fulldesc

        eventDescription.appendChild(eventDescHeader)
        eventDescription.appendChild(eventDescDetails)
        eventDescription.appendChild(eventFullDescs)

        eventMainEl.appendChild(imgSec)
        eventMainEl.appendChild(eventDetailsMain)
        eventMainEl.appendChild(eventPriceLi)
        eventMainEl.appendChild(eventDescription)
    }

    )
}

genPage()

