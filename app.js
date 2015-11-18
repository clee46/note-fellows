var userLibrary = [];   // array of User objects

var newFormInput = document.getElementById('newUser');
var returnFormInput = document.getElementById('returnUser');


//we need to account for switching users

function User (username, password) {
  this.username = username;
  this.password = password;
  this.library = [];
  userLibrary.push(this);
  this.newNote = function (title, content) {
    var temp = new Note (title, content);
    this.Library.push(temp);
  }
}  // array of Note objects

      // array of Note objects

  // newNote (title, content)
  // this.library.push(new Note (title, content))
  // creates new note and pushes to user's library
  // calls sendToBrowser to add to browser list

  // populateBrowser()
  // for loop scans through library array, calls sendToBrowser(library[i])


function Note (noteTitle, noteContent, date) {
  this.noteTitle = noteTitle;
  this.noteContent = noteContent;
  this.noteDate = date;
  this.noteTags = [];

  // sendToBrowser(note)
  // appends new note to end of browser list

  // displayNote ()
  // calls clear () first before displaying note
}

function newUser(event) {
    /*  var un = document.loginform.usr.value;
      var pw = document.loginform.pword.value;*/
  event.preventDefault();
  var username = event.target.usr.value;
  var password = event.target.pword.value;
  var temp = new User(username, password);
}
newFormInput.addEventListener('submit', newUser);

function returnUser(event) {
    /*  var un = document.loginform.usr.value;
      var pw = document.loginform.pword.value;*/
  event.preventDefault();
  var username = event.target.usr.value;
  var password = event.target.pword.value;
  var msg = document.createElement('p');
  for (var i = 0; i < userLibrary.length; i++) {
     if (userLibrary[i].username === username && userLibrary[i].password === password) {
        console.log('both correct');
        NoteTracker.currentUser = userLibrary[i];
        //need to store current user in Local Storage
        /*localStorage.setItem('currentUser', JSON.stringify(NoteTracker.currentUser));*/
        window.location = "notes.html";
     }
     else if (userLibrary[i].username === username && userLibrary[i].password !== password) {
        msg.textContent = "Incorrect Password";
        returnFormInput.appendChild(msg);
     } else {
        msg.textContent = "User Name Invalid";
        returnFormInput.appendChild(msg);
    }
  }
}


returnFormInput.addEventListener('submit', returnUser);




//need function to search for return user


//call constructor to search array for username


  // newNote (title, content)
  // this.library.push(new Note (title, content))
  // creates new note and pushes to user's library
  // calls sendToBrowser to add to browser list

  // populateBrowser()
  // for loop scans through library array, calls sendToBrowser(library[i])





function Notebook (note) {
  // this is a stretch goal
}

var NoteTracker = {

/*textInput: document.getElementById('textInput'),
submit: document.getElementById('submit'),
newNote: document.getElementById('new'), // undefined right now becuase there is no new note button created yet
noteList: document.getElementById('noteList'),
displayWindow: document.getElementById('displayWindow'),*/
  // currentUser is assigned the User object that passes checkInfo?
  currentUser: null
  // checkInfo (username, password) method here
  // for loop scans through userLibrary array
  // if pass, return User object?
  // if fail, return null?

/*
SetUser: function () {
  this.currentUser = globalUser;
}
*/

  // newUser (event)
  // var username = event.target.myName.value;
  // var password = event.target.min.value;
  // if checkInfo fails, create the new User
    // var user = new User (username,password);
    // userLibrary.push(user);
    // this.addToBrowser(user);
  // if checkInfo passes, error message ("user already exists!")

  // returnUser(event)
  // var username = event.target.myName.value;
  // var password = event.target.min.value;
  // this.checkInfo(username, password);
    // if pass, set currentUser to userLibrary[i];
      // go to notes.html, call currentUser.populateBrowser
    // if fail, error message ("user doesn't exist!")

  // clearDisplay ()
  // removes the Node that displays current note
    clearContent: function () {
      var form = document.getElementById('textInput');
      var container = form.parentNode;
      container.removeChild(form);
      /*console.log(remove);*/
  },
// sends note to local storage
  // var saveNote = function () {
  //   currentUser.library.push()
  // }
  createContent: function() {
    this.clearContent();
    document.getElementById('displayWindow').innerHTML = '<form id="textInput"><fieldset><label for="noteTitle">Title</label><input type="text" name="noteTitle"/><label for="noteContent">Content</label><input type="text" name="noteContent"/><input class="button-primary" type="submit" value="Create New Note"></fieldset></form>';
    /*var createForm = document.createElement('form');
    createForm.id = 'textInput';
    this.displayWindow.appendChild(createForm);
    console.log(displayWindow);*/
    /*var getForm = document.getElementsByTagName('form');
    console.log(getForm);
    getForm[0].setAttribute('id', 'textInput');*/

    /*var createFieldSet = document.createElement('fieldset');
    console.log(createFieldSet);
    createFieldSet.id = 'fieldset';
    this.textInput.appendChild(createFieldSet);
    var createLabel = document.createElement('label');
    console.log(createLabel);
    createLabel.setAttribute('for', 'noteTitle');
    createFieldSet.appendChild(createLabel);
    var createInput = document.createElement('input');
    console.log(createInput);
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('name', 'noteTitle');*/
}

};

// Event listener for New User login form
// var elNewUser = document.getElementById('newUser');
// elNewUser.addEventListener('submit', NoteTracker.newUser);

// Event listener for Returning User login form
// var elReturnUser = document.getElementById('returnUser');
// elReturnUser.addEventListener('submit', NoteTracker.returnUser);

/*if (localStorage.currentUser) {
  var globalUser = JSON.parse(localStorage.getItem('currentUser'));
  NoteTracker.SetUser();
  console.log('local storage retrieved');
   }
*/
