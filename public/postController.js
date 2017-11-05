function upFile(){
  var form = $('form')[0]; // You need to use standard javascript object here
  var formData = new FormData(form);
$.ajax({
    url: 'https://agile-everglades-67445.herokuapp.com/api/files',
    data: formData,
    type: 'POST',
    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    processData: false, // NEEDED, DON'T OMIT THIS,
    headers: {'Authorization': 'access_token ' + localStorage.access_token}
}).then((data) => {
  console.log(data);
  $('#images').val("https://agile-everglades-67445.herokuapp.com/" + data.result);
  if (data.code == 1) {
    $(".post-btn").removeAttr("disabled");
  } else {
    alert("Đã có lỗi upload ảnh. Xin hãy thử lại!");
  }
}).fail((err) => {
  console.error(err);
});
}
function post(){
  var room = {
    name : $('#form-post input[name=name]').val(),
    address : $('#form-post input[name=address]').val(),
    street : $('#form-post input[name=street]').val(),
    city : $('#form-post input[name=city]').val(),
    touristPlaces : $('#form-post input[name=touristPlaces]').val(),
    phoneNumber : $('#form-post input[name=phoneNumber]').val(),
    area : $('#form-post input[name=area]').val(),
    price : $('#form-post input[name=price]').val(),
    description : $('#form-post input[name=description]').val(),
    images : $('#form-post input[name=images]').val()
  }
  console.log(room);
  $.ajax({
      url: 'https://agile-everglades-67445.herokuapp.com/api/rooms',
      data: room,
      type: 'POST',
      headers: {'Authorization': 'access_token ' + localStorage.access_token}
  }).then((data) => {
    console.log(data);
    if (data.code == 1) {
      alert("Đã đăng thành công. Xin hãy chờ duyệt!");
    } else {
      alert("Đã có lỗi xảy ra. Xin hay thử lại!");
    }
  }).fail((err) => {
    console.error(err);
  });
}
