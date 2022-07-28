// Get saved event list from local storage
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

    eventsLikedNum.innerHTML = "Events you liked: " + num
}

genEventsNum()

// Generate and display saved events list
var genEventList = function(eventlist) {
    var eventBlock = document.createElement ("section")
    eventBlock.className = "event-block"
    var eventTitle = document.createElement("h3")
    eventTitle.innerHTML = eventlist.title

    var eventImg = document.createElement("a")
    eventImg.href = "./eventdesc.html?eventid=" + eventlist.event_id
    var eventImgEl = document.createElement("img")
    eventImgEl.src = eventlist.logo_img
    eventImgEl.className = "event-block-img"
    eventImg.appendChild(eventImgEl)
    var eventTime = document.createElement("p")
    eventTime.innerHTML = eventlist.time
    var eventLocation = document.createElement("p")
    eventLocation.innerHTML = eventlist.address

    eventBlock.appendChild(eventTitle)
    eventBlock.appendChild(eventImg)
    eventBlock.appendChild(eventTime)
    eventBlock.appendChild(eventLocation)

    eventSavedMain.appendChild(eventBlock)

}

// Loop though all the items from array on local storage
var eventSavedMain = document.getElementById("event-main")
if (savedItems != null) { 
    for (i=0; i < savedItems.length; i++) {
        (function(i) {
            genEventList(savedItems[i])
            
        }(i)
        )
    }
}

var backBtn = document.getElementById("back-btn")

// Add event listener on Back button to direct to the previous page.
backBtn.addEventListener("click", function(event) {

    event.preventDefault();
    window.history.go(-1)

}

)