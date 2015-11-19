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
  // var newNoteInput = document.getElementById('textInput');
  // newNoteInput.addEventListener('submit', function(e) {NoteTracker.newNote(e);
  // NoteTracker.createForm();},false);
}

// OBJECT CONSTRUCTORS
function User (username, password, library, tagLibrary) {
  this.username = username;
  this.password = password;
  this.library = library;
  this.tagLibrary = tagLibrary;
  userLibrary.push(this);
}
function Note (noteTitle, noteContent) {
  this.noteTitle = noteTitle;
  this.noteContent = noteContent;
  this.noteTags = [];
  this.noteIndex = 0;
}

// GLOBAL FUNCTIONS
function newUserForm (event) {
  // event.preventDefault();
  document.getElementById('loginForm').innerHTML = '';
  document.getElementById('loginForm').innerHTML = '<form name="loginform" id="newUser"><fieldset><legend>New User</legend><label>Username</label><input type="text" name="usr" placeholder="username" required="required"><label>Password</label><input type="password" name="pword" placeholder="password" required="required"><p id="msg"></p><br/><input type="submit" value="Create New User"/></fieldset></form><input class="button-primary" type="submit" value="Switch to Login Page" id="existingButton">';
  var newUserEl = document.getElementById('newUser');
  newUserEl.addEventListener('submit', function(e) {newUser(e);},false);
  var existingButton = document.getElementById('existingButton');
  existingButton.addEventListener('click', function(e) {returnUserForm(e);},false);
}
function returnUserForm (event) {
  // event.preventDefault();
  document.getElementById('loginForm').innerHTML = '';
  document.getElementById('loginForm').innerHTML = '<form name="loginform" id="returnUser"><fieldset><legend>Returning User</legend><label>Username</label><input type="text" name="usr" placeholder="username" required="required"><label>Password</label><input type="password" name="pword" placeholder="password" required="required"><p id="msg"></p><br/><input type="submit" value="Login"/></fieldset></form><input class="button-primary" type="submit" value="Create New User" id="newButton">';
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
    var noteTag = event.target.noteTag.value;
    var noteContent = event.target.noteContent.value;
    console.log("note title is: " + noteTitle);
    console.log("note tag is: " + noteTag);
    console.log("note content is: " + noteContent);
    var temp = new Note (noteTitle, noteContent);
    temp.noteIndex = userLibrary[userIndex].library.length;
    temp.noteTags.push(noteTag);
    if (userLibrary[userIndex].tagLibrary.indexOf(noteTag) === -1) {
      userLibrary[userIndex].tagLibrary.push(noteTag);
      console.log('note tag did not exist and was pushed to user tag library');
    }

    console.log("current index is: " + this.currentIndex);
    userLibrary[userIndex].library.push(temp);
    localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
    this.sendToBrowser(temp);
  },
  deleteTag: function() {// deletes tags from user's library
    for (var i = 0; i < userLibrary[userIndex].library[tempNoteId].noteTags.length; i++) {
      var x = userLibrary[userIndex].library[tempNoteId].noteTags[i];
      for (var j = 0; j < userLibrary[userIndex].library.length; j++) {
        for (var k = 0; k < userLibrary[userIndex].tagLibrary.length; k++) {
          if (x === userLibrary[userIndex].tagLibrary[k]) {
            userLibrary[userIndex].tagLibrary.splice(k,1);
            break;
          }
        }
      }
    }
  },
  deleteNote: function(event) {
    event.preventDefault();
    // adjust note indices
    for (var j = tempNoteId + 1; j < userLibrary[userIndex].library.length; j++) {
      console.log('index before ' + userLibrary[userIndex].library[j].noteIndex);
      userLibrary[userIndex].library[j].noteIndex--;
      console.log('index after ' + userLibrary[userIndex].library[j].noteIndex);
    }
    noteCount = 0;
    this.deleteTag();
    this.clearNoteBrowser();
    this.clearForm();
    this.createForm();
    userLibrary[userIndex].library.splice(tempNoteId, 1);
    NoteTracker.sendAll();
    localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
  },
  getTarget: function (e) {
    return e.target || e.srcElement;
  },
  getNote: function (e) {
    var target = this.getTarget(e);
    var elParent = target.parentNode;
    var noteID = elParent.id.slice(7);//slicing string to get array position
    console.log('noteID is: ' + noteID);
    tempNoteId = parseInt(noteID);    // noteID is a string! tempNoteId is an int!
    this.displayNote(tempNoteId);
  },
  sendToBrowser: function (note) {
    var elList = document.createElement('li');    // new list element
    elList.setAttribute('id',"counter" + note.noteIndex);

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
  listQ: function (value){
    console.log('value is: ' + value);
  },
  tagsMenu: function() {
      var tags = '<form>Search By Tags: <select id="noteTags" onchange="NoteTracker.searchForTag(this.value)"><option value="none">None</option>';
      for (var i = 0; i < userLibrary[userIndex].tagLibrary.length; i++) {
        tags += '<option value="' + userLibrary[userIndex].tagLibrary[i] + '">' + userLibrary[userIndex].tagLibrary[i] + '</option>';
      }
      tags += '</select></form>';
    return tags;
  },
  createForm: function() {
    this.clearForm();
    document.getElementById('displayWindow').innerHTML = '<form id="textInput"><fieldset><legend>Create New Note</legend><label for="noteTitle">Title</label><textarea name="noteTitle"/></textarea><label for="noteTag">Add a Tag</label><input type="text" name="noteTag"/><label for="noteContent">Content</label><textarea name="noteContent"/></textarea><input class="button-primary" type="submit" value="Create New Note"></fieldset></form>' + this.tagsMenu();
    newNoteInput = document.getElementById('textInput');
    newNoteInput.addEventListener('submit', function(e) {NoteTracker.newNote(e);
    NoteTracker.createForm();},false);
  },
  editNote: function(e) {
    event.preventDefault();
    var noteID = tempNoteId;
    this.clearNoteWrapper();
    document.getElementById('displayWindow').innerHTML = '<form id="textInput"><fieldset><legend>Edit Note</legend><label for="noteTitle">Title</label><textarea name="noteTitle">' + userLibrary[this.currentIndex].library[noteID].noteTitle + '</textarea><label for="noteContent">Content</label><textarea name="noteContent">' + userLibrary[this.currentIndex].library[noteID].noteContent + '</textarea><input class="button-primary" type="submit" value="Update Note"></fieldset></form>';
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
  },
  searchForTag: function (tag) {
    // called by drop-down list menu, sends all notes with a given tag to browser
    NoteTracker.clearNoteBrowser();
    if (tag === "none") {NoteTracker.sendAll();}
    var temp = [];
    for (var i = 0; i < userLibrary[userIndex].library.length; i++) {
      var x = userLibrary[userIndex].library[i];
      for (var j = 0; j < userLibrary[userIndex].library[i].noteTags.length; j++) {
        if (userLibrary[userIndex].library[i].noteTags[j] === tag) {
          temp.push(i);
          NoteTracker.sendToBrowser(x);
          break;
        }
      }
    }
  }
};

// when notes.html loads, display all of current user's notes and show a new form
if (document.title === "Note Fellows") {
  NoteTracker.sendAll();
  NoteTracker.createForm();
}
