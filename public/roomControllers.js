var rooms = [];
var numberOfRooms;
var currentRoom = 0;

var getRoomsOnPage = (page, key) =>{
  $.ajax({
    type  : 'get',
    url   : 'https://murmuring-anchorage-78399.herokuapp.com/api/rooms' + "?page=" + page + "&key=" + key
  }).then((data) => {
    rooms = data.result;
    console.log(rooms);
    // $("#room_img").append(`<img alt="image" src="${rooms[currentRoom].images[0]}" class="media-object">`);
    // $("#room_name").append(rooms[currentRoom].name);
    $("#main_info").append("<li class='span4 box-container'>" +
      "<div class='holder'>" +
            "<a class='overlay' title='property title' href='#'>" +
              "<span class='more'></span>" +
              `<img alt='image' src='${rooms[currentRoom].images[1]}' class='media-object'>` +
            "</a>" +
            "<div class='prop-info'>" +
                `<h3 class='prop-title'>${rooms[currentRoom].name}</h3>` +
                "<ul class='more-info clearfix'>" +
                    `<li class='info-label clearfix'><span class='pull-left'>Price:</span> <span class='qty pull-right'>${rooms[currentRoom].price}</span></li>` +
                "</ul>" +
            "</div>" +
        "</div>" +
    "</li>");
    currentRoom++;
  }).fail((err) => {
    console.error(err);
  });
}
getRoomsOnPage(1);
getRoomsOnPage(1);
getRoomsOnPage(1);
getRoomsOnPage(1);

// rooms.forEach(function(value) {
//   getRoomsOnPage(1);
//   console.log('Hi');
// })
