// # GifTastic

// ### Overview

// In this assignment, you'll use the GIPHY API to make a dynamic web page that populates with gifs of your choice. To finish this task, you must call the GIPHY API and use JavaScript and jQuery to change the HTML of your site.

// ![GIPHY](Images/1-giphy.jpg)

// ### Before You Begin

// 1. **Hit the GIPHY API**.
//    * Fool around with the GIPHY API. [Giphy API](https://github.com/Giphy).
//    * Be sure to read about these GIPHY parameters (hint, hint):
//      * `q`
//      * `limit`
//      * `rating`
//    * Like many APIs, GIPHY requires developers to use a key to access their API data. To use the GIPHY API, you'll need a GIPHY account (don't worry, it's free!) and then obtain an API Key by [creating an app](https://developers.giphy.com/dashboard/?create=true).
//    * Make sure you switch the protocol in the query URL from **`http to https`**, or the app may not work properly when deployed to Github Pages.

// 2. **[Watch the demo video](homework_demo.mov)**

//    * You should have a high-level understanding of how this assignment works before attempting to code it.

// ### Instructions

// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// 7. Deploy your assignment to Github Pages.

// 8. **Rejoice**! You just made something really cool.

// - - -

// ### Minimum Requirements

// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed.

// - - -

// ### Create a README.md

// Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

// * [About READMEs](https://help.github.com/articles/about-readmes/)

// * [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

// - - -

// ### Add To Your Portfolio

// After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.



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

