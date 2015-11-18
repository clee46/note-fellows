var userLibrary = [];   // array of User objects

//we need to account for switching users

if (document.title === "Welcome to Note Fellows!") {
  console.log ("You are on Index.html");
  var newFormInput = document.getElementById('newUser');
  var returnFormInput = document.getElementById('returnUser');
  newFormInput.addEventListener('submit', newUser);
  returnFormInput.addEventListener('submit', returnUser);
}
else if (document.title === "Note Fellows") {
  console.log("You are on Notes.html");
  var el = document.getElementById('noteList');
  el.addEventListener('click', function(e) {user1.getNote(e);}, false);
}



var counter = 0;    // id counter for ul list items
var user1 = new User('clee46', 'password');
user1.newNote('Note1 Title', 'How much wood could a woodchuck chuck if a woodchuck could chuck wood?');
user1.newNote('Note2 Title', 'This is an example of a note fellows note!');
user1.newNote('Note3 Title', 'Project week is coming! Project week is coming!');
userLibrary.push(user1);

function test (e) {
  var target = getTarget(e);
  console.log('The target is: ' + target);
}

function getTarget(e) {
  return e.target || e.srcElement;
}

function User (username, password) {
  this.username = username;
  this.password = password;
  this.library = [];
  userLibrary.push(this);

  this.newNote = function (title, content) {
    var temp = new Note (title, content);
    this.library.push(temp);
    this.sendToBrowser(temp);
  }

  this.sendToBrowser = function (note) {
    console.log('Inside sendToBrowser');
    var elList = document.createElement('li');   // new list element

    elList.setAttribute('id',"counter"+ counter);

    var elTitle = document.createElement('p');    // note title
    elTitle.textContent = note.noteTitle;
    elList.appendChild(elTitle);

    var elDate = document.createElement('p');    // note date
    elDate.textContent = note.noteDate;
    elList.appendChild(elDate);

    var elContent = document.createElement('p');    // note content
    elContent.textContent = note.noteContent;
    elList.appendChild(elContent);    // append list element to existing list
    el.appendChild(elList);
    counter++;
  }
  this.getNote = function (e) {
    var target = getTarget(e);
    var elParent = target.parentNode;
    var noteID = elParent.id.slice(7);
    console.log('noteID is: ' + noteID);
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

  // saveNote ()
  // JSON to save note in local storage
}

function newUser(event) {
    /*  var un = document.loginform.usr.value;
      var pw = document.loginform.pword.value;*/
  event.preventDefault();
  var username = event.target.usr.value;
  var password = event.target.pword.value;
  var temp = new User(username, password);
}


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





//need function to search for return user


//call constructor to search array for username


  // newNote (title, content)
  // this.library.push(new Note (title, content))
  // creates new note and pushes to user's library
  // calls sendToBrowser to add to browser list

  // populateBrowser()
  // for loop scans through library array, calls sendToBrowser(library[i])







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

// getForm = document.getElementById('textInput');
// submit = document.getElementById('submit');
// newNote = document.getElementById('new'); // undefined right now becuase there is no new note button created yet
// noteList = document.getElementById('noteList');
// displayWindow = document.getElementById('displayWindow');
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
  //   var clearContents = function () {
  //   var remove = displayWindow.parentNode;
  //   remove.removeChild(displayWindow);
  // }
// sends note to local storage
  // var saveNote = function () {
  //   currentUser.library.push()
  // }

}

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
