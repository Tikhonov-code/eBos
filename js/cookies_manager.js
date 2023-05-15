function setCookie(cname,cvalue,exmins) {
  const d = new Date();
  d.setTime(d.getTime() + (exmins*60*1000));
  let expires = "expires=" + d.toUTCString();
  let xx = cname + "=" + cvalue + ";" + expires + ";path=/" + "; SameSite=None;";
  console.log(xx);
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + "; SameSite=None;";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}