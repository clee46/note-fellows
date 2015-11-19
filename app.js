var userLibrary = [];
var noteCount = 0;
var tempNoteId;

// this control flow allows us to avoid errors when switching between html pages
if (document.title === "Welcome to Note Fellows!") {
  if (localStorage.userIndex  && localStorage.userLibrary) {
    var userIndex = JSON.parse(localStorage.getItem('userIndex'));
    userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
    console.log('local storage retrieved');
  }
  console.log ("You are on Index.html");
  newUserForm();
  // var newFormInput = document.getElementById('newUser');
  // var returnFormInput = document.getElementById('returnUser');
  // newFormInput.addEventListener('submit', newUser);
  // returnFormInput.addEventListener('submit', returnUser);
}
else if (document.title === "Note Fellows") {
  if (localStorage.userIndex) {
    var userIndex = JSON.parse(localStorage.getItem('userIndex'));
    userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
    console.log('local storage retrieved. user index is: ' + userIndex);
   }

  console.log("You are on Notes.html");
  var el = document.getElementById('noteList');
  el.addEventListener('click', function(e) {NoteTracker.getNote(e);},false);
  var newNoteInput = document.getElementById('textInput');
  newNoteInput.addEventListener('submit', function(e) {NoteTracker.newNote(e);
  NoteTracker.createForm();},false);
}

// OBJECT CONSTRUCTORS
function User (username, password, library) {
  this.username = username;
  this.password = password;
  this.library = library;
  userLibrary.push(this);
}
function Note (noteTitle, noteContent) {
  this.noteTitle = noteTitle;
  this.noteContent = noteContent;
}

// GLOBAL FUNCTIONS
function newUserForm (event) {
  // event.preventDefault();
  document.getElementById('loginForm').innerHTML = '';
  document.getElementById('loginForm').innerHTML = '<form name="loginform" id="newUser"><fieldset><legend>New User</legend><label>Username</label><input type="text" name="usr" placeholder="username"><label>Password</label><input type="password" name="pword" placeholder="password"><p id="msg"></p><br/><input type="submit" value="Create New User"/></fieldset></form><input class="button-primary" type="submit" value="Switch to Login Page" id="existingButton">';
  var newUserEl = document.getElementById('newUser');
  newUserEl.addEventListener('submit', function(e) {newUser(e);},false);
  var existingButton = document.getElementById('existingButton');
  existingButton.addEventListener('click', function(e) {returnUserForm(e);},false);
}
function returnUserForm (event) {
  // event.preventDefault();
  document.getElementById('loginForm').innerHTML = '';
  document.getElementById('loginForm').innerHTML = '<form name="loginform" id="returnUser"><fieldset><legend>Returning User</legend><label>Username</label><input type="text" name="usr" placeholder="username"><label>Password</label><input type="password" name="pword" placeholder="password"><p id="msg"></p><br/><input type="submit" value="Login"/></fieldset></form><input class="button-primary" type="submit" value="Create New User" id="newButton">';
  var returnUserEl = document.getElementById('returnUser');
  returnUserEl.addEventListener('submit', function(e) {returnUser(e);},false);
  var newButton = document.getElementById('newButton');
  newButton.addEventListener('click', function(e) {newUserForm(e);},false);
}
function newUser(event) {
  event.preventDefault();
  var username = event.target.usr.value;
  var password = event.target.pword.value;
  var msg = document.getElementById('msg');
  var library = [];
  var userExists = false;

  for (var i = 0; i < userLibrary.length; i++) {
    if (userLibrary[i].username === username) {
      msg.textContent = "Username taken";
      userExists = true;
    }
  }
  if (!userExists) {
    var temp = new User(username, password, library);
    NoteTracker.currentUser = temp;
    var x = userLibrary.length - 1;
    localStorage.setItem('userIndex', JSON.stringify(x));
    localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
    window.location = "notes.html";
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

var NoteTracker = {

  currentIndex: userIndex,

  newNote: function (event) {
    event.preventDefault();
    var noteTitle = event.target.noteTitle.value;
    var noteContent = event.target.noteContent.value;
    console.log("note title is: " + noteTitle);
    console.log("note content is: " + noteContent);
    var temp = new Note (noteTitle, noteContent);
    console.log("current index is: " + this.currentIndex);
    userLibrary[this.currentIndex].library.push(temp);
    localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
    this.sendToBrowser(temp);
  },
  deleteNote: function() {
    noteCount =0;
    console.log(tempNoteId);
    console.log(userLibrary);
    userLibrary[userIndex].library.splice(tempNoteId, 1);
    this.clearNoteBrowser();
    this.clearForm();
    localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
    this.createForm();
    console.log(userLibrary);
    for (i=0; i < userLibrary[userIndex].library.length; i++) {
      this.sendToBrowser(userLibrary[userIndex].library[i]);
    }
  },
  getTarget: function (e) {
    return e.target || e.srcElement;
  },
  getNote: function (e) {
    var target = this.getTarget(e);
    var elParent = target.parentNode;
    var noteID = elParent.id.slice(7);//slicing string to get array position
    console.log('noteID is: ' + noteID);
    tempNoteId = noteID;
    this.displayNote(noteID);
  },
  sendToBrowser: function (note) {
    var elList = document.createElement('li');    // new list element
    elList.setAttribute('id',"counter" + noteCount);

    var elTitle = document.createElement('p');    // note title
    elTitle.textContent = note.noteTitle;
    elList.appendChild(elTitle);

    var elDate = document.createElement('p');     // note date
    elDate.textContent = note.noteDate;
    elList.appendChild(elDate);

    var elContent = document.createElement('p');    // note content
    elContent.textContent = note.noteContent;
    elList.appendChild(elContent);    // append list element to existing list
    el.appendChild(elList);
    noteCount++;
  },
  sendAll: function () {
    for (var i = 0; i < userLibrary[userIndex].library.length; i++) {
      this.sendToBrowser(userLibrary[userIndex].library[i]);
    }
  },
  clearNoteBrowser: function () {
    document.getElementById('noteList').innerHTML = '';
  },
  clearForm: function () {
    document.getElementById('displayWindow').innerHTML = '';
  },
  clearNoteWrapper: function (){
    document.getElementById('noteWrapper').innerHTML = '';
  },
  createForm: function() {
    this.clearForm();
    document.getElementById('displayWindow').innerHTML = '<form id="textInput"><fieldset><legend>Create New Note</legend><label for="noteTitle">Title</label><input type="text" name="noteTitle"/><label for="noteContent">Content</label><input type="text" name="noteContent"/><input class="button-primary" type="submit" value="Create New Note"></fieldset></form>';
    newNoteInput = document.getElementById('textInput');
    newNoteInput.addEventListener('submit', function(e) {NoteTracker.newNote(e);
    NoteTracker.createForm();},false);
  },
  editNote: function(e) {
    event.preventDefault();
    var noteID = tempNoteId;
    this.clearNoteWrapper();
    document.getElementById('displayWindow').innerHTML = '<form id="textInput"><fieldset><legend>Edit Note</legend><label for="noteTitle">Title</label><input type="text" value="' + userLibrary[this.currentIndex].library[noteID].noteTitle + '" name="noteTitle"><label for="noteContent">Content</label><input type="text" value="' + userLibrary[this.currentIndex].library[noteID].noteContent + '" name="noteContent"><input class="button-primary" type="submit" value="Update Note"></fieldset></form>';
    var newNoteInput = document.getElementById('textInput');
    newNoteInput.addEventListener('submit', function(e) {
      userLibrary[userIndex].library[tempNoteId].noteTitle = e.target.noteTitle.value;
      userLibrary[userIndex].library[tempNoteId].noteContent = e.target.noteContent.value;
      localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
      NoteTracker.createForm();},false);
  },
  displayNote: function(noteID) {
    this.clearForm();
    tempNoteId = noteID;
    document.getElementById('displayWindow').innerHTML = '<div id="noteWrapper"><h4>'+ userLibrary[this.currentIndex].library[noteID].noteTitle + '</h4><br/><br/><p>' + userLibrary[this.currentIndex].library[noteID].noteContent + '</p><input class="button-primary" type="submit" value="Edit Note" id="editbutton"><input class="button-primary" type="submit" value="Delete" id="deleteButton"></div>';
    var editButton = document.getElementById('editbutton');
    editButton.addEventListener('click', function(e){NoteTracker.editNote(e);}, false);
    var deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', function(e){NoteTracker.deleteNote(e);}, false);
  }
};

if (document.title === "Note Fellows") {NoteTracker.sendAll();}
