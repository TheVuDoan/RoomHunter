var rooms = [];
var numberOfRooms;
var query = window.location.search.substring(1);
var re = query==='' ? '' : /w/gi;
var newQuery = query.replace(re, ' ');

var source = document.getElementById('entry-template').innerHTML;
var template = Handlebars.compile(source);
var getRoomsOnPage = (page, key) => {
  $.ajax({
    type  : 'get',
    url   : 'https://murmuring-anchorage-78399.herokuapp.com/api/rooms' + "?page=" + page + "&key=" + key
  }).then((data) => {
    rooms = data.result;
    console.log(rooms);
    var test = template({obj: rooms});
    document.getElementById('main_info').innerHTML = test;
  }).fail((err) => {
    console.error(err);
  });
}

var getSortedRoom = (page, key, sort) => {
  $.ajax({
    type  : 'get',
    url   : 'https://murmuring-anchorage-78399.herokuapp.com/api/rooms' + "?page=" + page + "&key=" + key + "&sort=" + sort
  }).then((data) => {
    rooms = data.result;
    console.log(rooms);
    var test = template({obj: rooms});
    document.getElementById('main_info').innerHTML = test;
  }).fail((err) => {
    console.error(err);
  });
}

query === '' ? getRoomsOnPage(1,'Đà Lạt Cô Tô Hội An') : getRoomsOnPage(1,newQuery);
console.log(newQuery);
