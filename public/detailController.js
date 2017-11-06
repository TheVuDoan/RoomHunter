var query = window.location.search.substring(1);
var tour;
var cur1,cur2;
var rooms = [];

var getDetailRoom = (id) => {
  $(document).ready(function() {
    $.ajax({
      type  : 'get',
      url   : 'https://agile-everglades-67445.herokuapp.com/api/room/' + id
    }).then((data) => {
      console.log(data);
      tour = data.touristPlaces;
      console.log(id);
      for (let i = 0;i<data.images.length;i++) {
        $("#images_slide").append("<div><img alt='image' src='"+ data.images[i] + "' class='media-object2'></div>")
      }
      $('#images_slide').removeClass("slick-initialized slick-slider");
      $('#images_slide').slick({
        arrows: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
      });
      $("#propName").html(data.name);
      $("#propPrice").html(data.price+'VNĐ');
      $("#propArea").html(data.area + 'm2');
      $("#propPhone").html(data.phoneNumber);
      $("#propAdr").html(data.address + data.street + ', ' + data.district + ', ' + data.city);
      $("#propDes").html(data.description);
      getRoomsOnPage(1,tour);
      getRoomsOnPage2(1,tour);
    }).fail((err) => {
      console.error(err);
    });
  })
}
getDetailRoom(query);

var getRoomsOnPage = (page, key) => {
  $.ajax({
    type  : 'get',
    url   : 'https://agile-everglades-67445.herokuapp.com/api/rooms' + "?page=" + page + "&key=" + key
  }).then((data) => {
    rooms = data.result;
    console.log(rooms);
    if (rooms[0]._id === query) cur1 = 1;
    else cur1 = 0;
    if (rooms[cur1] != null) {
      $("#firstLink").attr("href",`/rooms?${rooms[cur1]._id}`);
      $("#firstImage").attr("src",rooms[cur1].images[0]);
      $("#firstName").html(rooms[cur1].name);
      $("#firstPrice").html(rooms[cur1].price+'VNĐ');
      $("#firstTour").html(rooms[cur1].touristPlaces);
    }
    else {
      $("#first").css("display","none");
    }
  }).fail((err) => {
    console.error(err);
  }).always(() => {
    isLoading = false;
  });
}

var getRoomsOnPage2 = (page, key) => {
  $.ajax({
    type  : 'get',
    url   : 'https://agile-everglades-67445.herokuapp.com/api/rooms' + "?page=" + page + "&key=" + key
  }).then((data) => {
    rooms = data.result;
    console.log(rooms);
    if (rooms[2] != null) {
      if (rooms[2]._id === query) cur2 = 3;
      else cur2 = 2;
      if (rooms[cur2] != null) {
        $("#secondLink").attr("href",`/rooms?${rooms[cur2]._id}`);
        $("#secondImage").attr("src",rooms[cur2].images[0]);
        $("#secondName").html(rooms[cur2].name);
        $("#secondPrice").html(rooms[cur2].price+'VNĐ');
        $("#secondTour").html(rooms[cur2].touristPlaces);
      }
      else {
        $("#second").css("display","none");
      }
    } else {
      $("#second").css("display","none");
    }

  }).fail((err) => {
    console.error(err);
  }).always(() => {
    isLoading = false;
  });
}
