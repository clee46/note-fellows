var userLibrary = [];
var NoteTracker = {};

if (localStorage.userIndex && localStorage.userLibrary) {
  // ????? var userIndex = JSON.parse(localStorage.getItem('userIndex'));
  userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
}

getLoginTemplate();

function User (username, password, library, tagLibrary) {
  this.username = username;
  this.password = password;
  this.library = library;
  this.tagLibrary = tagLibrary;
  userLibrary.push(this);
}

/******************GLOBAL FUNCTIONS***************/

var loginTemplate = '';
function getLoginTemplate() {
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
    newUserLogin($(this));
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
    returnUserLogin($(this));
  });
  $('#newButton').on('click', function(event) {
    newUserForm();
  });
}


function newUserLogin($btn) {
  var username = $btn.siblings('[name=usr]').val();
  var password = $btn.siblings('[name=pword]').val();

  // check empty fields
  if (!username.length || !password.length) {
    $('#msg').text('Please enter username and password');
  } else {
    var userExists = false;
    var checkUsernameExists = function(element) {
      console.log(element);
      if (username === element.username) {
        userExists = true;
      }
    };
    userLibrary.forEach(checkUsernameExists);

    if (!userExists) {
      var temp = new User(username, password, [], []);
      userLibrary.push(temp);
      // *****
      NoteTracker.currentUser = temp;
      // save to local storage
      localStorage.setItem('userIndex', JSON.stringify(userLibrary.length - 1));
      localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
      // redirect to notes.html
      redirectTo('/notes.html');
    } else {
      $('#msg').text('Username taken');
    }
  }
}

function returnUserLogin($btn) {
  var username = $btn.siblings('[name=usr]').val();
  var password = $btn.siblings('[name=pword]').val();

  // check empty fields
  if (!username.length || !password.length) {
    $('#msg').text('Please enter username and password');
  } else {
    var userExists = false;
    var checkCorrectLogin = function(element, index) {
      if (username === element.username) {
        // username match
        userExists = true;
        if (password === element.password) {
          // password match
          NoteTracker.currentUser = element;
          localStorage.setItem('userIndex', JSON.stringify(index));
          // ??? localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
          redirectTo('/notes.html');
        }
      }
    };
    userLibrary.forEach(checkCorrectLogin);

    if (!userExists) {
      $('#msg').text('User does not exist');
    } else {
      $('#msg').text('Incorrect password');
    }
  }
}

var redirectTo = function(path) {
  $(location).attr('pathname', path);
};
