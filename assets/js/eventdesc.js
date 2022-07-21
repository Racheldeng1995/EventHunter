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
        var eventVenueUrl =  "https://www.eventbriteapi.com/v3/events/" + "338509329517" + "venues"  + "/?token=" + APIToken
        return fetch(eventVenueUrl)
        .then (function (response) {
            if (response.ok) {              
                return response.json()
            }
            else {
                alert('Error: Event Not Found');
              }
        })
    }
    )
}
getEventDetails()

