var userLibrary = [];

var NoteTracker = {};

function User(username, password, library, tagLibrary) {
  this.username = username;
  this.password = password;
  this.library = library;
  this.tagLibrary = tagLibrary;
}

var util = {};
util.redirectTo = function(path) {
  $(location).attr('pathname', path);
};
