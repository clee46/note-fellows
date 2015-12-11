var tempNoteId;

if (localStorage.userIndex) {
  var userIndex = JSON.parse(localStorage.getItem('userIndex'));
  userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
}

$('#noteList').on('click', function(e) {
  noteTracker.getNote(e);
});

/***************OBJECT CONSTRUCTORS***************/
// the User constructors has been moved to in global.js

function Note(noteTitle, noteContent) {
  this.noteTitle = noteTitle;
  this.noteContent = noteContent;
  this.noteTags = [];
  this.noteIndex = 0;
}

var noteTracker = {};
noteTracker.currentIndex = userIndex;

noteTracker.newNote = function(event) {
  event.preventDefault();
  var noteTitle = event.target.noteTitle.value;
  var noteTag = event.target.noteTag.value;
  var noteContent = event.target.noteContent.value;

  var temp = new Note(noteTitle, noteContent);
  temp.noteIndex = userLibrary[userIndex].library.length;

  if (noteTag.length > 0) {
    temp.noteTags.push(noteTag);
    if (userLibrary[userIndex].tagLibrary.indexOf(noteTag) === -1) {
      userLibrary[userIndex].tagLibrary.push(noteTag);
    }
  }
  userLibrary[userIndex].library.push(temp);
  localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
  this.sendToBrowser(temp);
};

noteTracker.deleteTag = function(tag) { // deletes specified tag from user's library
  var toBeDeleted = userLibrary[userIndex].tagLibrary.indexOf(tag);
  userLibrary[userIndex].tagLibrary.splice(toBeDeleted, 1);
};

noteTracker.checkTagExists = function(tag) {
  var tagExists = false;
  for (var j = 0; j < userLibrary[userIndex].library.length; j++) {
    for (var k = 0; k < userLibrary[userIndex].library[j].noteTags.length; k++) {
      if (userLibrary[userIndex].library[j].noteTags.indexOf(tag) !== -1) {
        tagExists = true;
        break;
      }
    }
  }
  return tagExists;
};

noteTracker.deleteNote = function(event) {
  event.preventDefault();
  // adjust note indices
  for (var j = tempNoteId + 1; j < userLibrary[userIndex].library.length; j++) {
    userLibrary[userIndex].library[j].noteIndex--;
  }
  var tempTags = []; // store the tags to be deleted before deleting the note
  for (var k = 0; k < userLibrary[userIndex].library[tempNoteId].noteTags.length; k++) {
    tempTags.push(userLibrary[userIndex].library[tempNoteId].noteTags[k]);
  }
  userLibrary[userIndex].library.splice(tempNoteId, 1); //delete the note
  // check if the tags attached to the deleted note exist in the updated library
  for (var i = 0; i < tempTags.length; i++) {
    // if no other instances exist, then delete the tag from the user's tag library
    if (!this.checkTagExists(tempTags[i])) {
      this.deleteTag(tempTags[i]);
    }
  }
  localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
  // ???????
  userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
  this.clearNoteBrowser();
  this.clearForm();
  this.createForm();
  noteTracker.sendAll();
};

noteTracker.getTarget = function(e) {
  return e.target || e.srcElement;
};

noteTracker.getNote = function(e) {
  var target = this.getTarget(e);
  var noteID = target.id.slice(7); //slice iD to get array position
  tempNoteId = parseInt(noteID); // noteID is a string! tempNoteId is an int!
  this.displayNote(tempNoteId);
};

noteTracker.sendToBrowser = function(note) {
  var $elList = $('<li>');
  $elList.attr('id', 'counter' + note.noteIndex)

  var $elTitle = $('<p>');
  $elTitle.text(note.noteTitle);

  var $elNote = $('<p>');
  $elNote.text(note.noteTags);
  $elList.append($elTitle, $elNote);

  $('#noteList').append($elList);
};

noteTracker.sendAll = function() {
  for (var i = 0; i < userLibrary[userIndex].library.length; i++) {
    this.sendToBrowser(userLibrary[userIndex].library[i]);
  }
};

noteTracker.clearNoteBrowser = function() {
  $('#noteList').html('');
};

noteTracker.clearForm = function() {
  $('#displayWindow').html('');
};

noteTracker.clearNoteWrapper = function() {
  $('#noteWrapper').html('');
};

// populates dropdown
noteTracker.tagsDropDown = function() {
  // ?????????
  userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
  var menu = '<form id="tagForm">Search By Tags: <select id="noteTags" onchange="noteTracker.searchForTag(this.value)"><option class="tagColor" value="none">None</option>';
  for (var i = 0; i < userLibrary[userIndex].tagLibrary.length; i++) {
    menu += '<option class="tagColor" value="' + userLibrary[userIndex].tagLibrary[i] + '">' + userLibrary[userIndex].tagLibrary[i] + '</option>';
  }
  menu += '</select></form>';
  return menu;
};

noteTracker.assignTags = function() {
  var select = document.getElementById('multipleTags');
  var result = [];
  var options = select && select.options;
  var opt;
  for (var i = 0; i < options.length; i++) {
    opt = options[i];
    if (opt.selected) {
      if (userLibrary[userIndex].library[tempNoteId].noteTags.indexOf(opt.value) === -1) {
        userLibrary[userIndex].library[tempNoteId].noteTags.push(opt.value);
      }
    }
  }
  localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
  //  ???????????????????????
  userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
};

noteTracker.removeTags = function() {
  var select = document.getElementById('multipleTags');
  var result = [];
  var options = select && select.options;
  var opt;
  for (var i = 0; i < options.length; i++) {
    opt = options[i];
    if (opt.selected) {
      var x = userLibrary[userIndex].library[tempNoteId].noteTags.indexOf(opt.value);
      if (x !== -1) {
        userLibrary[userIndex].library[tempNoteId].noteTags.splice(x, 1);
        if (!this.checkTagExists(opt.value)) {
          noteTracker.deleteTag(opt.value);
        }
      }
    }
  }
  localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
  //  ???????????????????????
  userLibrary = JSON.parse(localStorage.getItem('userLibrary'));
};

noteTracker.tagsMultipleSelect = function() {
  var menu = '<form><select id="multipleTags" size="5" multiple="multiple">';
  for (var i = 0; i < userLibrary[userIndex].tagLibrary.length; i++) {
    menu += '<option value="' + userLibrary[userIndex].tagLibrary[i] + '">' + userLibrary[userIndex].tagLibrary[i] + '</option>';
  }
  menu += '</select><button class="button button-primary alignButtons" onclick="noteTracker.assignTags();">Assign</button><button class="button button-primary alignButtons" onclick="noteTracker.removeTags();">Remove</button></form>';
  return menu;
};

noteTracker.createForm = function() {
  this.clearForm();
  var htmlToPage = '<form id="textInput" class="borders"><fieldset><legend>Create New Note</legend><label for="noteTitle">Title</label><textarea id="titleTextArea" name="noteTitle" required="required" maxlength="66"/></textarea><label for="noteTag">Add a Tag</label><input type="text" name="noteTag"/><label for="noteContent">Content</label><textarea id="contentTextArea" name="noteContent" required="required"></textarea><input class="button-primary" type="submit" value="Create New Note"></fieldset></form>' + this.tagsDropDown();

  $('#displayWindow').html(htmlToPage);

  $('#textInput').on('submit', function(e) {
    noteTracker.newNote(e);
    noteTracker.createForm();
  });
};

noteTracker.updateForm = function(e) {
  userLibrary[userIndex].library[tempNoteId].noteTitle = e.target.noteTitle.value;
  userLibrary[userIndex].library[tempNoteId].noteContent = e.target.noteContent.value;
  if (e.target.noteTag.value !== '') {
    if (!noteTracker.checkTagExists(e.target.noteTag.value)) {
      userLibrary[userIndex].library[tempNoteId].noteTags.push(e.target.noteTag.value);
    }
    if (userLibrary[userIndex].tagLibrary.indexOf(e.target.noteTag.value) === -1) {
      userLibrary[userIndex].tagLibrary.push(e.target.noteTag.value);
    }
  }
  localStorage.setItem('userLibrary', JSON.stringify(userLibrary));
  noteTracker.createForm();
};

noteTracker.editNote = function(e) {
  e.preventDefault();
  var noteID = tempNoteId;
  console.log('func call');
  this.clearNoteWrapper();

  var htmlToPage = '<form id="textInput" class="borders"><fieldset><legend>Edit Note</legend><label for="noteTitle">Title</label><textarea id="titleTextArea" name="noteTitle" maxlength="66">' + userLibrary[this.currentIndex].library[noteID].noteTitle + '</textarea><label for="noteTag">Add a New Tag</label><textarea name="noteTag"></textarea>' + '<label for="noteContent">Content</label><textarea id="contentTextArea" name="noteContent">' + userLibrary[this.currentIndex].library[noteID].noteContent + '</textarea><input class="button-primary" type="submit" value="Update Note"></fieldset></form>' + this.tagsMultipleSelect();

  $('#displayWindow').html(htmlToPage);

  $('textInput').on('submit', function(e) {
    noteTracker.updateForm(e);
  });
};

noteTracker.displayNote = function(noteID) {
  this.clearForm();
  // tempNoteId = noteID;
  console.log(noteID);

  var htmlToPage = '<div id="noteWrapper" class="borders"><h4 class="labelColor">' + userLibrary[this.currentIndex].library[noteID].noteTitle + '</h4><br/><br/><p class="labelColor">' + userLibrary[this.currentIndex].library[noteID].noteContent + '</p><input class="button-primary navspacing" type="submit" value="Edit note" id="editButton"><input class="button-primary navspacing" type="submit" value="Delete" id="deleteButton"><input class="button-primary navspacing" type="submit" value="New note" id="newNoteButton"></div>';
  $('#displayWindow').html(htmlToPage);

  $('#editButton').on('click', function(e) {
    console.log('listener clicked');
    noteTracker.editNote(e);
  });
  $('#deleteButton').on('click', function(e) {
    noteTracker.deleteNote(e);
  });
  $('#newNoteButton').on('click', function(e) {
    noteTracker.createForm();
  });
};

noteTracker.searchForTag = function(tag) {
  noteTracker.clearNoteBrowser();
  if (tag === "none") {
    noteTracker.sendAll();
  }
  var temp = [];
  for (var i = 0; i < userLibrary[userIndex].library.length; i++) {
    var x = userLibrary[userIndex].library[i];
    for (var j = 0; j < userLibrary[userIndex].library[i].noteTags.length; j++) {
      if (userLibrary[userIndex].library[i].noteTags[j] === tag) {
        temp.push(i);
        noteTracker.sendToBrowser(x);
        break;
      }
    }
  }
};


noteTracker.sendAll();
noteTracker.createForm();
