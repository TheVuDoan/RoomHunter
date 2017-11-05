var rooms = [];
var numberOfRooms;
var currentPage = 2;
var currentSortPage = 1;
var isLoading = false;
var loadDone = false;
var isSort = false;
var isAscend = false;
var isDescend = false;
var query = window.location.search.substring(1);
var re = query==='' ? '' : /w/gi;
var newQuery = query.replace(re, ' ');

var source = document.getElementById('entry-template').innerHTML;
var template = Handlebars.compile(source);
var getRoomsOnPage = (page, key) => {
  isSort = false;
  isLoading = true;
  $.ajax({
    type  : 'get',
    url   : 'https://agile-everglades-67445.herokuapp.com/api/rooms' + "?page=" + page + "&key=" + key
  }).then((data) => {
    rooms = data.result;
    if (rooms.length===0) loadDone = true;
    console.log(rooms);
    var test = template({obj: rooms});
    $('#main_info').append(test);
  }).fail((err) => {
    console.error(err);
  }).always(() => {
    isLoading = false;
  });
}

var getSortedRoom = (page, key, sort) => {
  isSort = true;
  isLoading = true;
  $.ajax({
    type  : 'get',
    url   : 'https://agile-everglades-67445.herokuapp.com/api/rooms' + "?page=" + page + "&key=" + key + "&sort=" + sort
  }).then((data) => {
    rooms = data.result;
    if (rooms.length===0) loadDone = true;
    console.log(rooms);
    var test = template({obj: rooms});
    if (currentSortPage == 1) {
      $('#main_info').html(test);
    } else {
      $('#main_info').append(test);
    }
  }).fail((err) => {
    console.error(err);
  }).always(() => {
    isLoading = false;
  });
}

query === '' ? getRoomsOnPage(1,'undefined') : getRoomsOnPage(1,newQuery);

$("#ascend").click(function(){
  isAscend = true;
  isDescend = false;
  loadDone = false;
  currentSortPage = 1;
  getSortedRoom(1,'undefined',1);
});

$("#descend").click(function(){
  isDescend = true;
  isAscend = false;
  loadDone = false;
  currentSortPage = 1;
  getSortedRoom(1,'undefined',-1);
});

$(window).on('scroll', onWindowScrolled);
function onWindowScrolled(){
  if(!isLoading && !loadDone && $(window).height() + $(window).scrollTop() === $(document).height()){
    if (isSort === false) {
      query === '' ? getRoomsOnPage(currentPage,'Đà Lạt Cô Tô Hội An') : getRoomsOnPage(currentPage,newQuery);
      currentPage++;
    } else {
      if (isAscend) {
        query === '' ? getSortedRoom(currentSortPage+1,'undefined',1) : getSortedRoom(currentSortPage+1,newQuery,1);
        currentSortPage++;
      } else {
        query === '' ? getSortedRoom(currentSortPage+1,'undefined',-1) : getSortedRoom(currentSortPage+1,newQuery,-1);
        currentSortPage++;
      }
    }
  }
}
