const CheckCookies = () => {
  let user = getCookie("username");
  if (user === "") {
    $("#login-modal").modal("show");
    $("#result").html("Hello dear : " + $("#username").val());
  }
  if (user !== "") {
    switch (user) {
      case "admin":
        $("#result").html("Hello dear : " + user);
        $("#login-modal").modal("hide");
        break;
      case "employee":
        $("#result").html("Hello dear : " + user);
        $("#login-modal").modal("hide");
        break;
      default:
        $("#login-modal").modal("show");
        break;
    }
  }
};

const CheckCredentials = () => {
  let username = $("#username").val();
  let password = $("#password").val();
  alert("Username " + username + " Password " + password);
  if (IsClientValid(username, password)) {
    $("#result").html("Hello dear : " + $("#username").val());
    $("#login-modal").modal("hide");
    setCookie("username", username, 2);
  } else {
    alert("Wrong Credentials");
    DeleteCookie();
  }
};

const IsClientValid = (username, password) => {
  return username == "admin" && password == "123";
};

const CheckCookie = () => {
  alert("Username Cookie " + getCookie("username"));
};

const DeleteCookie = () => {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  alert("Username Cookie " + getCookie("username"));
};
