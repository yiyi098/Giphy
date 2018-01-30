var topicsList = ["movies", "games", "sports", "art"];

function renderButtons() {
  $("#topicsButton").empty();
  for (var i = 0; i < topicsList.length; i++) {
  var topics = $("<button>");
  topics.addClass("topics");
  topics.attr("data-topic", topicsList[i]);
  topics.html(topicsList[i]);
  $("#topicsButton").append(topics);
  }
}

$("#addTopic").on("click", function(event) {
  event.preventDefault();
  var topics = $("#topics-input").val().trim();
  topicsList.push(topics);
  renderButtons();
  $("#topics-input").val("");
});

function displayTopicsInfo() {
  debugger;
  $("#topics").empty();
  var topic = $(this).attr("data-topic");
  var jQueryURL = "https://api.giphy.com/v1/gifs/search?api_key=iO5N75fDUiVZECR8MVZb87FYqDKdPzxF&q=" + topic + "&limit=10&offset=0&lang=en";

  $.ajax({
  url: jQueryURL,
  method: "GET"
  }).done(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      var newDiv = $("<div>");
      var newGif = $("<img>");
      newGif.addClass("gif");
      var still = response.data[i].images.fixed_height_still.url;
      var moving = response.data[i].images.fixed_height.url;
      newGif.attr("src", still);
      newGif.attr("data-state", "still");
      newGif.attr("data-still", still);
      newGif.attr("data-moving", moving);
      var newRating = $("<p>");
      newRating.text("Rating: " + response.data[i].rating);
      newDiv.append(newGif);
      newDiv.append(newRating);
      $("#topics").append(newDiv);
    }
  });
}

renderButtons();

$(document).on("click", ".topics", displayTopicsInfo);

$(document).on("click", ".gif", function() {
  if ($(this).attr("data-state") === "still") {
    $(this).attr("src", $(this).attr("data-moving"));
    $(this).attr("data-state", "moving");
  } 
  else if ($(this).attr("data-state") === "moving") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

