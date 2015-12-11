var login = {};

login.retrieveData = function() {
  if (localStorage.userIndex && localStorage.userLibrary) {
    // ????? var userIndex = JSON.parse(localStorage.getItem('userIndex'));
    userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
  }
};

login.showForm = function() {
  $.get('templates/login.handlebars', function(data) {
    login.template = Handlebars.compile(data);
  }).done(function() {
    login.showNewUserForm();
  });
};

login.showNewUserForm = function() {
  var userElement = {
    formId: 'newUser',
    userType: 'Create New User',
    submitText: 'Register',
    buttonValue: 'Switch to Login Page',
    buttonId: 'existingButton'
  };

  var compiledHTML = login.template(userElement);
  $('#loginForm').html(compiledHTML);

  $('#newUser button').on('click', function(event) {
    event.preventDefault();
    login.checkNewUserLogin($(this));
  });
  $('#existingButton').on('click', function(event) {
    login.showReturnUserForm();
  });
};

login.showReturnUserForm = function() {
  var userElement = {
    formId: 'returnUser',
    userType: 'Returning User',
    submitText: 'Sign in',
    buttonValue: 'Create New User',
    buttonId: 'newButton'
  };

  var compiledHTML = login.template(userElement);
  $('#loginForm').html(compiledHTML);

  $('#returnUser button').on('click', function(event) {
    event.preventDefault();
    login.checkReturnUserLogin($(this));
  });
  $('#newButton').on('click', function(event) {
    login.showNewUserForm();
  });
};

login.checkNewUserLogin = function($btn) {
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
      util.redirectTo('/notes.html');
    } else {
      $('#msg').text('Username taken');
    }
  }
}

login.checkReturnUserLogin = function($btn) {
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
          util.redirectTo('/notes.html');
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

$(function() {
  login.retrieveData();
  login.showForm();
});
