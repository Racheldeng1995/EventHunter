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


