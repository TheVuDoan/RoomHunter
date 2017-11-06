if (localStorage.username != 'admin') {
  $("body").css("display","none");
} else {
  var query = window.location.search.substring(1);
  var source = document.getElementById('entry-template').innerHTML;
  var template = Handlebars.compile(source);
  var getApproval = (page, key) => {
    $.ajax({
      type  : 'get',
      url   : 'https://agile-everglades-67445.herokuapp.com/api/rooms-admin' + "?page=" + page + "&key=" + key,
      headers: {'Authorization': 'access_token ' + localStorage.access_token}
    }).then((data) => {
      console.log(data);
      rooms = data.result;
      console.log(rooms);
      var test = template({obj: rooms});
      $('#main_info').append(test);
      $('#up').click(function() {
        id = $('#up').val();
        console.log(id);
        // approve(id);
      })
    }).fail((err) => {
      console.error(err);
    });
  }

  getApproval(1);

  var aprrove = (id) => {
    $.ajax({
      type  : 'post',
      url   : 'https://agile-everglades-67445.herokuapp.com/api/rooms?rld=' + id,
      headers: {'Authorization': 'access_token ' + localStorage.access_token},
      data : {
        status : 1
      }
    }).then((data) => {
      console.log(id);
      console.log(data);
    }).fail((err) => {
      console.error(err);
    });
  }

  if (query != '') {
    aprrove(query);
    console.log("HI");
  }
}
