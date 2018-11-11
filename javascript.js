

var topics = ["dog", "cat", "cow", "bird", "snake", "fish", "squid", "skunk", "butterfly", "horse", "mouse", "rabbit", 
"bear", "bat", "deer", "sheep", "shark", "hyena", "whale"];

function renderButtons() {

    $("#button-place").empty();

    for (var i = 0; i < topics.length; i++) {
 
        var a = $("<button class= 'btn btn-primary'>");

        a.addClass("animal");

        a.attr("data-name", topics[i]);
  
        a.text(topics[i]);

        $("#button-place").append(a);
    }
}
renderButtons();

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    
    var topic = $("#add-button").val().trim();
    
    topics.push(topic);
    
    renderButtons();

});


function makeGifs() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=QI9TF5ZXof8V581EfJQfmxGya3JXa353&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.addClass("gif");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("state", "still");

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gif-place").prepend(gifDiv);
        }
    });
}

function changeGifState(){
    var giffy = $(this).attr("state");

    if(giffy === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("state", "animate");
    } else if(giffy === "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("state", "still");
    }
}


    $("#button-place").on("click", "button", makeGifs);
    $("#gif-place").on("click", "img", changeGifState);

