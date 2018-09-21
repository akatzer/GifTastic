$(document).ready(function () {

    //topics for initial buttons
    var topics = ["The Witcher 3", "Bioshock Infinite", "Final Fantasy VII", "The Last of Us", "League of Legends", "The Legend of Zelda: Breath of the Wild", "Gears of War", "Mario 64", "World of Warcraft"];

    //wrap everything in a function so we can call it when we add a new button
    function loadButtons() {

        //clear the buttons out so we can add the new one without appending the whole list again
        $("#btnDiv").empty();

        // loop to create the buttons    
        for (var i = 0; i < topics.length; i++) {
            var $btn = $("<button class='btn btn-primary gameBtn' >" + topics[i] + "</button>");
            $("#btnDiv").append($btn);
        }

        // click function for the giphy api
        $(".gameBtn").on("click", function () {
            var gameChosen = $(this).text()
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + gameChosen + "&limit=10";

            //getting info from the giphy API
            $.ajax({
                url: queryURL,
                method: "GET"
            })

                // function that grabs the rating and image url's and loops through to grab all 10
                .then(function (response) {
                    
                    //loop to go through the responses
                    for (var g = 0; g < response.data.length; g++) {
                        //var for initial still url
                        var imageUrl = response.data[g].images.fixed_height_still.url;
                        //var for animate url to be used later
                        var animateUrl = response.data[g].images.fixed_height.url;
                        // creates the image tag for the gif includes all the attributes needed
                        var gameImage = $("<img>");
                        gameImage.attr("src", imageUrl);
                        gameImage.attr("alt", "Responsive image");
                        gameImage.attr("class", "img-fluid");
                        gameImage.attr("data-still", imageUrl);
                        gameImage.attr("data-animate", animateUrl);
                        gameImage.attr("id", "image");
                        var rating = "<div id='ratings'> <p>Rating: " + response.data[g].rating + " </p></div>";
                        $("#gifDiv").prepend(rating);
                        $("#ratings").append(gameImage);
                    };

                    $("#image").on("click", function () {
                        var state = $(this).attr("data-state");
                        if (state == "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        }
                        else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });
                });

        });
    }


    $(".btn").on("click", function (event) {
        event.preventDefault();
        var newBtnVal = $("#gameInput").val().trim()
        topics.push(newBtnVal);
        $("#gameInput").val("");
        loadButtons();

    })

    loadButtons();

    $("#gameClear").on("click", function () {
        $("#btnDiv").empty();
        topics = [];
        $("#gifDiv").empty();
    })

})
