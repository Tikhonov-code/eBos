const CheckCredentials = () => {
  let username = $("#username").val();
  let password = $("#password").val();
  
  let user = getCookie("username");
  if (user === "admin") {
    $("#result").html("Welcome again " + username);
    } else {
        if (IsClientValid(username, password)) {
            $("#result").html("Hello dear : " + $("#username").val() + " " + $("#password").val());
            setCookie("username", username, 2);
            $("#login-modal").modal("hide");
          } else {
            alert("Wrong Credentials");
          }
        }
};

const IsClientValid = (username, password) =>  {
    return (username == "admin" && password == "123");
    }

const CheckCookie = () => {
    alert("Username Cookie " + getCookie("username"));
}

const DeleteCookie = () => {

    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("Username Cookie " + getCookie("username"));
}