var userLibrary = [];
var noteCount = 0;
var tempNoteId;

// this control flow allows us to avoid errors when switching between html pages
if (document.title === "Welcome to Note Fellows!") {
  if (localStorage.userIndex && localStorage.userLibrary) {
    var userIndex = JSON.parse(localStorage.getItem('userIndex'));
    userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
    console.log('local storage retrieved');
  }
  console.log ("You are on Index.html");
  var newFormInput = document.getElementById('newUser');
  var returnFormInput = document.getElementById('returnUser');
  newFormInput.addEventListener('submit', newUser);
  returnFormInput.addEventListener('submit', returnUser);
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
  NoteTracker.createContent();},false);
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
function newUser(event) {
  event.preventDefault();
  var username = event.target.usr.value;
  var password = event.target.pword.value;
  var msg = document.createElement('p');
  var library = [];
  for (var i = 0; i < userLibrary.length; i++) {
      if (userLibrary[i].username === username) {
        msg.textContent = "Username already exists!";
        returnFormInput.appendChild(msg);
        } else {
          NoteTracker.currentUser = userLibrary[i];
        }
      }
          var temp = new User(username, password, library);
  console.log("User has been created. Now login above.");
}

function returnUser(event) {
  event.preventDefault();
  var username = event.target.usr.value;
  var password = event.target.pword.value;
  var msg = document.createElement('p');
  for (var i = 0; i < userLibrary.length; i++) {
     if (userLibrary[i].username === username && userLibrary[i].password === password) {
        console.log('both correct');
        NoteTracker.currentUser = userLibrary[i];
        //need to store current user in Local Storage
        localStorage.setItem('userIndex', JSON.stringify(i));
        localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
        window.location = "notes.html";
     }
     else if (userLibrary[i].username === username && userLibrary[i].password !== password) {
        msg.textContent = "Incorrect Password";
        returnFormInput.appendChild(msg);
     }
     else {
        msg.textContent = "User Name Invalid";
        returnFormInput.appendChild(msg);
    }
  }
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
    this.createContent();
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
    //var form = document.getElementById('textInput');
    // var container = form.parentNode;
    // container.removeChild(form);
    document.getElementById('displayWindow').innerHTML = '';
  },
  clearNoteWrapper: function (){
    // var noteWrapper = document.getElementById('noteWrapper');
    // var container = noteWrapper.parentNode;
    // container.removeChild(noteWrapper);
    document.getElementById('noteWrapper').innerHTML = '';
  },
  createContent: function() {
    this.clearForm();
    document.getElementById('displayWindow').innerHTML = '<form id="textInput"><fieldset><legend>Create New Note</legend><label for="noteTitle">Title</label><input type="text" name="noteTitle"/><label for="noteContent">Content</label><input type="text" name="noteContent"/><input class="button-primary" type="submit" value="Create New Note"></fieldset></form>';
  },
  editNote: function(e) {
    event.preventDefault();
    var noteID = tempNoteId;
    // console.log('noteID is' + noteID);
    this.clearNoteWrapper();
    document.getElementById('displayWindow').innerHTML = '<form id="textInput"><fieldset><legend>Edit Note</legend><label for="noteTitle">Title</label><input type="text" value="' + userLibrary[this.currentIndex].library[noteID].noteTitle + '" name="noteTitle"><label for="noteContent">Content</label><input type="text" value="' + userLibrary[this.currentIndex].library[noteID].noteContent + '" name="noteContent"><input class="button-primary" type="submit" value="SaveNote"></fieldset></form>';
    var newNoteInput = document.getElementById('textInput');
    newNoteInput.addEventListener('submit', function(e) {
      console.log('Old note title is' + userLibrary[userIndex].library[tempNoteId].noteTitle);
      userLibrary[userIndex].library[tempNoteId].noteTitle = e.target.noteTitle.value;
      userLibrary[userIndex].library[tempNoteId].noteContent = e.target.noteContent.value;
      console.log('New note title is' + userLibrary[userIndex].library[tempNoteId].noteTitle);
      localStorage.setItem('userLibrary', JSON.stringify(userLibrary));

      // NoteTracker.newNote(e);
      // NoteTracker.deleteNote(tempNoteId);
      // NoteTracker.clearNoteBrowser();
      // NoteTracker.sendAll();
      NoteTracker.createContent();},false);
  },
  displayNote: function(noteID) {
    this.clearForm();
    console.log(noteID);
    tempNoteId = noteID;
    console.log(tempNoteId)
    document.getElementById('displayWindow').innerHTML = '<div id="noteWrapper"><h4>'+ userLibrary[this.currentIndex].library[noteID].noteTitle + '</h4><br/><br/><p>' + userLibrary[this.currentIndex].library[noteID].noteContent + '</p><input class="button-primary" type="submit" value="Edit Note" id="editbutton"><input class="button-primary" type="submit" value="Delete" id="deleteButton"></div>';
    var editButton = document.getElementById('editbutton');
    editButton.addEventListener('click', function(e){
      console.log('event listener fired');
      NoteTracker.editNote(e);
    }, false);
    var deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', function(e){
      console.log('event listener fired');
      NoteTracker.deleteNote(e);
    }, false);
  }
};

if (document.title === "Note Fellows") {NoteTracker.sendAll();}
