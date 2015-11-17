var userLibrary = [];   // array of User objects
var formInput = document.getElementById('newUser');

function User (username, password) {
  this.username = username;
  this.password = password;
  this.library = [];
  userLibrary.push(this);
}  // array of Note objects

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

function validateForm(event) {
    /*  var un = document.loginform.usr.value;
      var pw = document.loginform.pword.value;*/
  event.preventDefault();
  var username = event.target.usr.value;
  var password = event.target.pword.value;
  console.log('username is' + username);
  console.log('user password is' + password);
  var temp = new User(username, password);
  console.log('temp username' + temp.username);
  console.log('temp password' + temp.password);


  //userLibrary.push(temp);
  console.log(userLibrary);
}
formInput.addEventListener('submit', validateForm);

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

  // currentUser is assigned the User object that passes checkInfo?
  //currentUser: checkInfo(username, password);

  // checkInfo (username, password) method here
  // for loop scans through userLibrary array
  // if pass, return User object?
  // if fail, return null?

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

}

// Event listener for New User login form
// var elNewUser = document.getElementById('newUser');
// elNewUser.addEventListener('submit', NoteTracker.newUser);

// Event listener for Returning User login form
// var elReturnUser = document.getElementById('returnUser');
// elReturnUser.addEventListener('submit', NoteTracker.returnUser);
