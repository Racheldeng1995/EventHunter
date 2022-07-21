var savedItems = JSON.parse(localStorage.getItem("savedlist"))
console.log(savedItems)
var num = savedItems.length
console.log(num)
var eventsLikedNum = document.getElementById("events-you-liked")

var genEventsNum = function () {
    eventsLikedNum.innerHTML = "Events you liked: " + num
}

genEventsNum()

var genEventList = function(eventlist) {
    var eventBlock = document.createElement ("section")
    eventBlock.className = "event-block"
    var eventTitle = document.createElement("h1")
    eventTitle.innerHTML = eventlist.title

    var eventImg = document.createElement("img")
    eventImg.src = eventlist.logo_img
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

var eventSavedMain = document.getElementById("event-main")
for (i=0; i < savedItems.length; i++) {
    (function(i) {
        console.log(savedItems[i])
        genEventList(savedItems[i])
        
    }(i)
    )
}