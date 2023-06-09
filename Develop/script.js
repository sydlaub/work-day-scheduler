// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const savedNotesArray = JSON.parse(localStorage.getItem("savedNotes")) || []

$(document).ready(function () {
  //code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  $(savedNotesArray).each(function (index, item) {
    $(`div #${item.id}`).children('textarea').text(`${item.description}`);
  })

  //listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // get id and description from the nearest time-block div
    var id = $(this).parent('.time-block').attr('id');
    var description = $(this).siblings(".description").val();
    const obj = {
      id: id,
      description: description
    }

    savedNotesArray.push(obj)
    // Save description to local storage
    localStorage.setItem("savedNotes", JSON.stringify(savedNotesArray))
  });


  //apply the past, present, or future class to each time block by comparing the id to the current hour:
  // loop through each time-block div
  function updateHour() {
    // get current time using js
    var currentHour = moment().hour();

    // loop through each time-block div
    $('.time-block').each(function () {
      // get the hour from the div's id
      var blockHour = parseInt($(this).attr("id"));

      // add or remove past, present and future classes based on current hour
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });


  }
  updateHour();
  setInterval(updateHour, 1000);



  //Add code to display the current date in the header of the page.
  var currentDay = moment().format("dddd, MMMM Do");
  $("#currentDay").text(currentDay);

});
