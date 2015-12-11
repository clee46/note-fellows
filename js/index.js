var userLibrary = [];
var tempNoteId;

if (localStorage.userIndex  && localStorage.userLibrary) {
  var userIndex = JSON.parse(localStorage.getItem('userIndex'));
  userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
}
getLoginTemplate();



/******************GLOBAL FUNCTIONS***************/

var loginTemplate = '';
function getLoginTemplate() {
  console.log('HERE');
  $.get('templates/login.handlebars', function(data) {
    loginTemplate = Handlebars.compile(data);
  }).done(function() {
    newUserForm();
  });
};

function newUserForm() {
  var userElement = {
    formId: 'newUser',
    userType: 'Create New User',
    buttonValue: 'Switch to Login Page',
    buttonId: 'existingButton'
  };

  var compiledHTML = loginTemplate(userElement);
  $('#loginForm').html(compiledHTML);

  $('#newUser button').on('click', function(event) {
    event.preventDefault();
    newUser(event);
  });
  $('#existingButton').on('click', function(event) {
    returnUserForm();
  });
}

function returnUserForm() {
  var userElement = {
    formId: 'returnUser',
    userType: 'Returning User',
    buttonValue: 'Create New User',
    buttonId: 'newButton'
  };

  var compiledHTML = loginTemplate(userElement);
  $('#loginForm').html(compiledHTML);

  $('#returnUser button').on('click', function(event) {
    event.preventDefault();
    returnUser(event);
  });
  $('#newButton').on('click', function(event) {
    newUserForm();
  });
}


function newUser(event) {
  event.preventDefault();
  console.log('it works!');
  var username = event.target.usr.value;
  var password = event.target.pword.value;
  var msg = document.getElementById('msg');
  var library = [];
  var tags = [];
  var userExists = false;
  for (var i = 0; i < userLibrary.length; i++) {
    if (userLibrary[i].username === username) {
      msg.textContent = "Username taken";
      userExists = true;
    }
  }
  if (!userExists) {
    var temp = new User(username, password, library, tags);
    NoteTracker.currentUser = temp;
    var x = userLibrary.length - 1;
    localStorage.setItem('userIndex', JSON.stringify(x));
    localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
    // window.location = "notes.html";
    console.log('here');
  }
}

function returnUser(event) {
  event.preventDefault();
  var username = event.target.usr.value;
  var password = event.target.pword.value;
  var msg = document.getElementById('msg');
  var userExists = false;
  for (var i = 0; i < userLibrary.length; i++) {
    if (userLibrary[i].username === username && userLibrary[i].password === password) {
        NoteTracker.currentUser = userLibrary[i];
        localStorage.setItem('userIndex', JSON.stringify(i));
        localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
        window.location = "notes.html";
     }
    if (userLibrary[i].username === username && userLibrary[i].password !== password) {
        msg.textContent = "Incorrect Password";
        userExists = true;
     }
   }
   if (!userExists) {msg.textContent = "User Does Not Exist";}
}
