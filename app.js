// user login js

 function validateForm() {
        var un = document.loginform.usr.value;
        var pw = document.loginform.pword.value;
        var username = "username";
        var password = "password";
        if ((un == username) && (pw == password)) {
            window.location = "main.html";
            return false;
        }
        else { // change this to something else
            alert ("Login was unsuccessful, please check your username and password");
        }
      }
