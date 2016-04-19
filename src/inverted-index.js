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
  return content;
};

InvertedIndex.prototype.data = {};

InvertedIndex.prototype.cleanUp = function (wordsToBeCleaned){
  return wordsToBeCleaned.replace(/[,.:;'"?!-#_*@%$&<>]/g,"");
};

InvertedIndex.prototype.createIndex = function (filePath) {
  var that = this;
  var jsonFile = this.readFile(filePath);
  for (var i in jsonFile) {
    i = parseInt(i);
    var bookContent = jsonFile[i].title + " " + jsonFile[i].text;
    bookContent = bookContent.split(/\s/); //split sentence by space
    var wordsInBook = null;
    for (var j in bookContent) {
      wordsInBook = this.cleanUp(bookContent[j]);
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
  return this.data[wordsInBook];
};

InvertedIndex.prototype.searchIndex = function (searchTerms) {
  var x, data = this.data, searchTerm,
   searchResult = [];
  if (searchTerms.indexOf("") !== -1){
    searchTerm = searchTerms.split(/\s/);
    }else {
      searchTerm = searchTerms;
    }

  if (typeof searchTerm === 'string') {
    for (x in data) {
      if (searchTerm === x){
        searchResult.push(data[x]);
      }
    }
  }

  else if (typeof searchTerm === 'object') {
    for (var i in searchTerm) {
      if(data.hasOwnProperty(searchTerm[i])) {
        //looping through the collection of words available
        for (var j in data) {
          if (searchTerm[i] === j) {
            searchResult.push(data[j]);
            break;
          }
        }
      }else {
        searchResult.push('Not Available');
        break;
      }
    }
  }
  return searchResult;
}; //end searchIndex function
