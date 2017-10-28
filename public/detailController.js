var query = window.location.search.substring(1);

var getDetailRoom = (id) => {
  $(document).ready(function() {
    $.ajax({
      type  : 'get',
      url   : 'https://murmuring-anchorage-78399.herokuapp.com/api/room/' + id
    }).then((data) => {
      console.log(data);
      $("#images_slide").html("<img alt='image' src='"+ data.images[0] + "' class='media-object2'>")
      $("#propName").html(data.name);
      $("#propPrice").html(data.price+'VNĐ');
      $("#propArea").html(data.area + 'm2');
      $("#propPhone").html(data.phoneNumber);
      $("#propAdr").html(data.address + data.street + ', ' + data.district + ', ' + data.city);
      $("#propDes").html(data.description);
    }).fail((err) => {
      console.error(err);
    });
  })
}

getDetailRoom(query);
