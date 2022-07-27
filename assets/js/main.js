 var savedItems = JSON.parse(localStorage.getItem("savedlist"))

if (savedItems == null) {
    var num = 0
}
else {
    var num = savedItems.length
}

var likedEvents = document.getElementById("likeMtr")
likedEvents.innerHTML = num


var wine1  = function(newElement) {
    fetch("https://www.eventbriteapi.com/v3/events/310224599127" + "/?token=" +"ZK55TMREDURZKUJDZZ64")

    .then(function(response){
        return response.json();
    })
    .then (function(data){
        console.log(data)
    })
    .then(function(data) {
        var eventD={
            "event_id": data.id,
            "logo_img": data.logo.url,
            "title": data.name.text,
            "location_name": data.venue_id
        }
        return eventDetails

    })}


// Fetching test data from server

var token = "ZK55TMREDURZKUJDZZ64"
var test="328814953377"
var testApi= "https://www.eventbriteapi.com/v3/events/" + test   + "/?token=" + token

fetch(testApi)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data) 
    newElement(data);
  
})


  

         var singleEvent = document.getElementById("main")
         singleEvent.className ="main-container"
         
         newElement = function(data){


      

       
        var mainDiv = document.createElement("div")
        mainDiv.className = "ui link cards"
       
        var subContainerDiv=document.createElement("div")
       subContainerDiv.className="card"
        
       var imgDiv = document.createElement("img")
        imgDiv.className = "image"
        imgDiv.src=data.logo.url
       
       
        var eventTitleDiv = document.createElement("div")
        eventTitleDiv.className = "content c-div"
      
       
        var eventName = document.createElement("div")
        eventName.className="header"
        eventName.innerHTML="title"
        eventName.innerHTML =data.name.text
       
        var eventDate = document.createElement("div")
        eventDate.className="date-location"
        eventDate.innerHTML="Date" // needs to check it might be jason
        eventDate.innerHTML = data.end.utc
       

        // var eventLocation = document.createElement("h4")
        // eventLocation.className = "date-location"
        // eventLocation.innerHTML="location"
        // eventLocation.innerHTML =data.location_name
        
        mainDiv.appendChild(subContainerDiv)
        subContainerDiv.appendChild(imgDiv)
        subContainerDiv.appendChild(eventName)
       subContainerDiv.appendChild(eventDate)
        // singleEvent.appendChild(eventLocation)
         singleEvent.appendChild(mainDiv)

         }

          


  
    

