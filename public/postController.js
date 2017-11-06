function upFile(){
  uploadSingle(0);
}
var images = [];
function uploadSingle(i){
  if(i === $('#file')[0].files.length){
    console.log('done');
    $(".post-btn").removeAttr("disabled");
    return;
  }
  var formData = new FormData();
  formData.append('file', $('#file')[0].files[i]);
  $.ajax({
    url: 'https://agile-everglades-67445.herokuapp.com/api/files',
    data: formData,
    type: 'POST',
    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    processData: false, // NEEDED, DON'T OMIT THIS,
    headers: {'Authorization': 'access_token ' + localStorage.access_token}
  }).then((data) => {
    console.log(data);
    images.push("https://agile-everglades-67445.herokuapp.com/" + data.result);
    uploadSingle(i+1);
  }).fail((err) => {
  console.error(err);
  alert("Đã có lỗi upload ảnh. Xin hãy thử lại!");
  return;
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
    images : images
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
