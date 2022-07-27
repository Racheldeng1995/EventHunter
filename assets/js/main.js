eventList=[]

var cityId = function() {
    var title=querySelector("title")

    cityId = document.location.search;
     title = cityId.split("=")[1];
  
    return title;
};



var startDate=document.querySelector("date-i1")
var stopDate=document.querySelector("date-i2")

document.querySelector('.inputD').addEventListener("click",event =>{
// get days from calendar
function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
    if (dateArray = startDate,stopDate){localStorage.setItem("#Choosen Dates", document.getElementById(startDate,stopDate).value)}


}});





// Fetching test data from server

var token ="ZK55TMREDURZKUJDZZ64"
var test="362083691067"
var testApi= "https://www.eventbriteapi.com/v3/events/" + test   + "/?token=" + token

fetch(testApi)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data) //comin event=>for loopp {for each single call(event function way )}
  
})


  

         var singleEvent = document.getElementById("main")
         singleEvent.className ="main-container"
         
         newElement = function(){

       
        var mainDiv = document.createElement("div")
        mainDiv.className = "ui link cards"
       
        var subContainerDiv=document.createElement("div")
       subContainerDiv.className="card"
        
       var imgDiv = document.createElement("img")
        imgDiv.className = "image"
        imgDiv.content
        imgDiv.src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCXsbUwbvbDDyt-rtsoYDyFpcIHRjzgK286Q&usqp=CAU" //jason img link
       
        var eventTitleDiv = document.createElement("div")
        eventTitleDiv.className = "content c-div"
      
       
        var eventName = document.createElement("div")
        eventName.className="header"
        eventName.innerHTML="title" // needs to check it might be jason
        eventName.innerHTML = singleEvent.evetName
       
        var eventDate = document.createElement("div")
        eventDate.className="date-location"
        eventDate.innerHTML="Date" // needs to check it might be jason
        eventDate.innerHTML = singleEvent.eventDate
       

        var eventLocation = document.createElement("h4")
        eventLocation.className = "date-location"
        eventLocation.innerHTML="location"
        eventLocation.innerHTML =singleEvent.location_name
        
        
        singleEvent.appendChild(imgDiv)
        singleEvent.appendChild(eventName)
        singleEvent.appendChild(eventDate)
        singleEvent.appendChild(eventLocation)
         }
        
        



function incLike(){

    document.getElementById("like-btn").innerHTML 

  
    

    }
    