var query = window.location.search.substring(1);

var getDetailRoom = (id) => {
  $(document).ready(function() {
    $.ajax({
      type  : 'get',
      url   : 'https://murmuring-anchorage-78399.herokuapp.com/api/room/' + id
    }).then((data) => {
      console.log(data);
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
    }).fail((err) => {
      console.error(err);
    });
  })
}

getDetailRoom(query);
