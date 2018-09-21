



$(document).ready(function () {

    var topics = ["The Witcher 3", "Bioshock Infinite", "Final Fantasy VII", "The Last of Us", "League of Legends", "The Legend of Zelda: Breath of the Wild", "Gears of War", "Destiny"];

    function loadButtons () {
        $("#btnDiv").empty();
    for (var i = 0; i < topics.length; i++) {
        var $btn = $("<button class='gameBtn'>" + topics[i] + "</button>");
        $("#btnDiv").append($btn);
    }

    

    $(".gameBtn").on("click", function () {
        var gameChosen = $(this).text()
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + gameChosen + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);
                for (var g = 0; g < response.data.length; g++) {
                    var imageUrl = response.data[g].images.fixed_height_still.url;
                    var animateUrl = response.data[g].images.fixed_height.url;
                    var gameImage = $("<img>");
                    gameImage.attr("src", imageUrl);
                    gameImage.attr("alt", "Responsive image");
                    gameImage.attr("class", "img-fluid");
                    gameImage.attr("data-still", imageUrl);
                    gameImage.attr("data-animate", animateUrl);
                    gameImage.attr("id", "image");
                    var rating = response.data[g].rating;
                    var p = $("<p>").html("Rating: " + rating + "<br>");
                    $("#gifDiv").prepend(p);
                    $("#gifDiv").prepend(gameImage);
                };
                $("img").on("click", function () {

                    var state = $(this).attr("data-state");
                    

                    if (state == "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });

    });
}


    $(".btn").on("click", function(event){
        event.preventDefault();
        var newBtnVal = $("#gameInput").val().trim()
        topics.push(newBtnVal);
        $("#gameInput").val("");
        loadButtons();
        
    })

    loadButtons();

})
