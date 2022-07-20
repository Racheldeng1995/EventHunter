var likeBtn = document.getElementById("like-btn")
likeBtn.addEventListener("click", function(event){

    event.preventDefault();
    var likeIcon = document.getElementById("like-icon")
    var likeValue = likeBtn.getAttribute("like-value")
    console.log(likeValue)
    

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

