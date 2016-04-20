/**
 * define Index class
 */
var InvertedIndex = function () {};

//end of Index class

/**
 * define readFile function
 */
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
  return content;
};

InvertedIndex.prototype.data = {};

/**
 * define cleanUp function the replaces special characters in a string
 */
InvertedIndex.prototype.cleanUp = function (wordsToBeCleaned){
  return wordsToBeCleaned.replace(/[,.:;'"?!-#_*@%$&<>]/g,"");
};

InvertedIndex.prototype.createIndex = function (filePath) {
  var that = this;
  var jsonFile = this.readFile(filePath);
  for (var bookIndex=0; bookIndex<jsonFile.length; bookIndex++) {
    var bookContent = jsonFile[bookIndex].title + " " + jsonFile[bookIndex].text;
    bookContent = this.cleanUp(bookContent);
    bookContent = bookContent.toLowerCase();
    var wordsInBook = bookContent.split(/\s/);
    this.data[bookIndex] = wordsInBook;
    for(var word in wordsInBook){
      if (this.data[wordsInBook[word]]){
        if(this.data[wordsInBook[word]].indexOf(bookIndex) === -1){
          this.data[wordsInBook[word]].push(bookIndex);
        }
      } else{
      this.data[wordsInBook[word]] = [bookIndex];
    }
    }
  }
};
/**
 * define getIndex function
 */
InvertedIndex.prototype.getIndex = function (filePath) {
  this.createIndex(filePath);
  return this.data[wordsInBook];
};// end of getIndex function

InvertedIndex.prototype.searchIndex = function (terms) {
  var termsArray;
  var that = this;
  if(Array.isArray(terms)){
    termsArray = terms;
  } else if(terms.indexOf(' ') ===-1){
      return checkOwnProperty(this.data , terms);
    }
    else{
    terms = this.cleanUp(terms).toLowerCase();
    termsArray = terms.split(/\s/);
  }

  var result =  termsArray.map(function(term){
     return checkOwnProperty(that.data , term);
  });

  return result;
}; //end searchIndex function

function checkOwnProperty(data , term){
  if(data.hasOwnProperty(term)){
    return data[term];
  }
  else{
    return [];
  }
}
