$(() => {
  //checkCookie();
  if (typeof UserOnline === "object" && Object.keys(UserOnline).length === 0) {
    $("#login-button").show();
    $("#logout-button").hide();
  }
});

const LoginHandler = () => {
  // open login modal
  $("#login-modal").modal("show");
};

const CheckLogin = () => {
  // check if user is logged in
  PostCredentials($("#username").val(), $("#password").val());
  $("#login-modal").modal("hide");
};
const UrlHost = "http://62.109.17.140:25025";
const UrlLocal = "http://localhost:25025";
const UrlAPI = UrlHost;

const PostCredentials = (username, password) => {
  // convert password to MD5 hash
  const myString = password;
  const hashString = CryptoJS.MD5(myString).toString();
  console.log(hashString);
  // post username and password to server
  $.ajax({
    url: UrlAPI + "/login" ,
    type: "POST",
    data: {
      username: username,
      password: hashString
    },
    //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (data) {
      if (data.status == "legal") {
        $("#login-modal").modal("hide");
        $("#login-button").hide();
        $("#logout-button").show();

        UserOnline = data;
        MenuShow(data.role);
   
        //setCookie("username", data.name, 30);
        //setCookie("role", data.role, 30);
        //setCookie("role", data.status, 30);
      }
    },
    error: function (xhr, status, error) {
      console.log(xhr);
      console.log(status);
      console.log(error);
    },
  });
};

const MenuShow = (role) => {
  switch (role) {
    case "Manager":
      $("#menu").append(
        '<ul><li onclick="ShowCustomersTable()"><a href="#">Customers</a></li>' +
          '<li onclick="ShowReportTable()"><a href="#">Report</a></li></ul>'
      );
      break;
    case "Employee":
      $("#menu").append(
        '<ul><li onclick="ShowCallsTable()"><a href="#">Calls</a></li></ul>'
      );
      break;

    default:
      break;
  }
};

const LogOutHandler = () => {
  $("#login-button").show();
  $("#logout-button").hide();
  $("#menu").empty();
  $("#MainContainer").empty();
  // cleanup data
  callsDataSource = null;
  customersDataSource = null;
  UserOnline = {};
  reportDataSource = null;
  document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();

};

$(document).on("keydown", function (event) {
  if (event.keyCode == 116) {
    // Check if the key code is equal to F5
    // Do something here, e.g. display a message or reload data
    console.log("Page refreshed with F5");
  }
});