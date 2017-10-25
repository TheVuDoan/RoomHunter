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
    let i;
    // $("#room_img").append(`<img alt="image" src="${rooms[currentRoom].images[0]}" class="media-object">`);
    // $("#room_name").append(rooms[currentRoom].name);
    for (i=0;i<rooms.length;i++) {
      $("#main_info").append("<li class='span4 box-container'>" +
        "<div class='holder'>" +
              "<a class='overlay' title='property title' href='#'>" +
                "<span class='more'></span>" +
                `<img alt='image' src='${rooms[i].images[1]}' class='media-object'>` +
              "</a>" +
              "<div class='prop-info'>" +
                  `<h3 class='prop-title'>${rooms[i].name}</h3>` +
                  "<ul class='more-info clearfix'>" +
                      `<li class='info-label clearfix'><span class='pull-left'>Price:</span> <span class='qty pull-right'>${rooms[currentRoom].price}</span></li>` +
                  "</ul>" +
              "</div>" +
          "</div>" +
      "</li>");
    }
  }).fail((err) => {
    console.error(err);
  });
}
getRoomsOnPage(1);
