var id;
if (localStorage.username !== undefined) {
  $(".login").css('display','none');
  $(".login-box").css('display','none');
  $(".login-name").css('display','inline-block');
  $(".login-box2").css('display','inline-block');
  $(".login-name").html('Chào mừng ' + localStorage.username + '!');
}

var sendUserData = () => {
  var username = $("#choice2 input[type=text]").val();
  var password = $("#choice2 input[type=password]").val();
  $(".login").css('display','none');
  console.log(username);
  console.log(password);
  $.ajax({
    type  : 'POST',
    url   : 'https://agile-everglades-67445.herokuapp.com/api/users',
    data : {
       username:username,
       password:password
    }

  }).then((data) => {
    console.log(data);
    if (data.code !== 1) {
      alert('Đã có lỗi xảy ra! Xin hãy thử lại');
    } else {
      alert("Đăng kí thành công!")
    }
  }).fail((err) => {
    console.error("hello",err);
  });
}

var signIn = () => {
  var username = $("#choice1 input[type=text]").val();
  var password = $("#choice1 input[type=password]").val();
  console.log(username);
  console.log(password);
  $.ajax({
    type  : 'POST',
    url   : 'https://agile-everglades-67445.herokuapp.com/api/login',
    data : {
       username:username,
       password:password
    }
  }).then((data) => {
    console.log(data);
    if (data.code === 1) {
      $(".login").css('display','none');
      $(".login-box").css('display','none');
      $(".login-name").css('display','inline-block');
      $(".login-box2").css('display','inline-block');
      $(".login-name").html('Chào mừng ' + data.user.username + '!');
      // $.ajaxSetup({
      //   beforeSend: function (xhr)
      //   {
      //      xhr.setRequestHeader("Authorization",'access_token ' + data.access_token);
      //   }
      // });
      localStorage.username = data.user.username;
      localStorage.role = data.user.role;
      localStorage.access_token = data.access_token;
      id = data.user._id;
      alert("Đã đăng nhập thành công!");
    } else {
      alert(data.error);
    }
  }).fail((err) => {
    console.error("hello",err);
  });
}

var signOut = () => {
  $.ajax({
    type  : 'GET',
    url   : 'https://agile-everglades-67445.herokuapp.com/api/logout',
    headers: {'Authorization': 'access_token ' + localStorage.access_token}
  }).then((data) => {
    console.log(data);
    $(".login-box").css('display','inline-block');
    $(".login-name").css('display','none');
    $(".login-box2").css('display','none');
    // $.ajaxSetup({
    //   beforeSend: function (xhr)
    //   {
    //      xhr.setRequestHeader("Authorization",'');
    //   }
    // });
    localStorage.clear();
  }).fail((err) => {
    console.error("hello",err);
  });
}

var getUserById = (id) => {
  console.log(id);
  $.ajax({
    type  : 'GET',
    url   : 'https://agile-everglades-67445.herokuapp.com/api/users/' + id
  }).then((data) => {
    console.log(data);
  }).fail((err) => {
    console.error("hello",err);
  });
}

$("#test").click(function() {
  getUserById('59fed63e0012e10012a3eb8d');
});
