/**
 * define Index class
 */
var InvertedIndex = function () {};

//end of Index class


InvertedIndex.prototype.readFile = function (filePath) {
  var content;
  $.ajax({
    url:filePath,
    async:false,
    dataType: 'json',
    error: function(err) {
      console.log("error");
    },
    success: function(data) {
      content = data;
    }
  });
  this.content = content;
  // return content;
};

InvertedIndex.prototype.data = {};

InvertedIndex.prototype.createIndex = function (filePath) {
  var jsonFile = this.readFile(filePath);
  for (var i in jsonFile) {
    i = parseInt(i);
    var bookContent = jsonFile[i].title + " " + jsonFile[i].text;
    bookContent = bookContent.split(/\s/); //split sentence by space
    var wordsInBook;
    for (var j in bookContent) {
      wordsInBook = bookContent[j].replace(/[,.:;'"?!-#_*@%$&<>]/g,"");
      // removes special characters
      wordsInBook = wordsInBook.toLowerCase(); //change to lower case
      if (this.data.hasOwnProperty(wordsInBook)) {
        if (this.data[wordsInBook].indexOf(i) === -1){
          this.data[wordsInBook].push(i);
        }
      } else {
        this.data[wordsInBook] = [i];
      }
    }

  }
};

InvertedIndex.prototype.getIndex = function (filePath) {
  this.createIndex(filePath);
};
