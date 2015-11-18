var userLibrary = [];
var noteCount = 0;

// this control flow allows us to avoid errors when switching between html pages
if (document.title === "Welcome to Note Fellows!") {
  if (localStorage.userIndex  && localStorage.userLibrary) {
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
  newNoteInput.addEventListener('submit', function(e) {NoteTracker.newNote(e);},false);
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

  var userExists = false;

  for (var i = 0; i < userLibrary.length; i++) {
      if (userLibrary[i].username === username) {
        msg.textContent = "Username already exists!";
        returnFormInput.appendChild(msg);
        userExists = true;
        }
      }
       if (!userExists) {
          var temp = new User(username, password, library);
          NoteTracker.currentUser = temp[i];
          var x = userLibrary.length - 1;
          console.log('last user is' + x);
          localStorage.setItem('userIndex', JSON.stringify(x));
          localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
          window.location = "notes.html";
  console.log("User has been created. Now login above.");
  }
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
  getTarget: function (e) {
    return e.target || e.srcElement;
  },
  getNote: function (e) {
    var target = this.getTarget(e);
    var elParent = target.parentNode;
    var noteID = elParent.id.slice(7);
    console.log('noteID is: ' + noteID);
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
  clearContent: function () {
      var form = document.getElementById('textInput');
      var container = form.parentNode;
      container.removeChild(form);
  },
  createContent: function() {
    this.clearContent();
    document.getElementById('displayWindow').innerHTML = '<form id="textInput"><fieldset><label for="noteTitle">Title</label><input type="text" name="noteTitle"/><label for="noteContent">Content</label><input type="text" name="noteContent"/><input class="button-primary" type="submit" value="Create New Note"></fieldset></form>';
  },
  displayNote: function(noteID) {
    this.clearContent();
    document.getElementById('displayWindow').innerHTML = '<h4>'+ userLibrary[this.currentIndex].library[noteID].noteTitle + '</h4><br/><br/><p>' + userLibrary[this.currentIndex].library[noteID].noteContent + '</p>';
  }
};

if (document.title === "Note Fellows") {NoteTracker.sendAll();}
