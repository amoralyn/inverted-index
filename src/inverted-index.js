var InvertedIndex;
(function() {
  'use strict';

  // Define Index class
  InvertedIndex = function() {};

  InvertedIndex.prototype = {
    // Define readFile function
    readFile : function(filePath) {
      var content;
      $.ajax({
        url:filePath,
        async:false,
        dataType: 'json',
        error: function(err) {
          console.log('Could not read JSON file');
        },
        success: function(data) {
          content = data;
        }
      });
      return content;
    },
    // End readFile function

    data : {},

    // Define cleanUp function to remove special characters
    cleanUp : function(wordsToBeCleaned) {
      return wordsToBeCleaned.replace(/[,.:;'"?!-#_*@%$&<>]/g,'');
    },

    // Define createIndex function
    createIndex : function(filePath) {
      var jsonFile = this.readFile(filePath);
      var len = jsonFile.length;

      /** Loops through the object to remove special characters,
      * change to lowercase and split
      */
      for (var bookIndex = 0; bookIndex < len; bookIndex++) {
        var bookContent = jsonFile[bookIndex].title + ' ' + jsonFile[bookIndex].text;
        bookContent = this.cleanUp(bookContent).toLowerCase();
        var wordsInBook = bookContent.split(/\s/);
        this.data[bookIndex] = wordsInBook;

        // Loops to check if word already exists in the index
        for (var word in wordsInBook) {
          if (this.data[wordsInBook[word]]) {
            if (this.data[wordsInBook[word]].indexOf(bookIndex) === -1) {
              this.data[wordsInBook[word]].push(bookIndex);
            }
          } else {
              this.data[wordsInBook[word]] = [bookIndex];
          }
        }
      }
      return this.data;
    },

    // Define getIndex function
    getIndex : function(filePath) {
      this.createIndex(filePath);
      return this.data[wordsInBook];
    },

    // Define searchIndex function
    searchIndex : function(terms) {
      var termsArray;
      var that = this;
      if (Array.isArray(terms)) {
        termsArray = terms;
        } else if(terms.indexOf(' ') ===-1) {
          return checkOwnProperty(this.data, terms);
        }
        else {
        terms = this.cleanUp(terms).toLowerCase();
        termsArray = terms.split(/\s/);
        }

      var result =  termsArray.map(function(term) {
         return checkOwnProperty(that.data, term);
      });
      return result;
    },
  };

  // Define checkOwnProperty function to check if a term already exists
  function checkOwnProperty(data, term) {
    if (data.hasOwnProperty(term)) {
      return data[term];
    }
    else {
      return [];
    }
  }

})();
