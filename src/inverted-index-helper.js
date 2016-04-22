function HelperMethods() {
  // Cache
  this._index = {};
}

// Define findIndex function to check if a term already exists
HelperMethods.prototype.findIndex = function(data, term) {
    return data.hasOwnProperty(term) ? data[term] : [];
};

// Define cleanUp function that replaces special characters in a string
HelperMethods.prototype.cleanUp = function(wordsToBeCleaned) {
    return wordsToBeCleaned.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
};

// Define readFile function that reads the JSON file
HelperMethods.prototype.readFile = function(filePath) {
    var content = [];

    $.ajax({
        url: filePath,
        async: false,
        dataType: 'json',
        error: function(err) {
            console.log('Could not read JSON file');
        },
        success: function(data) {
            content = data;
        }
    });

    return content;
};

// Does the indexing of the words in the object
HelperMethods.prototype.doIndexing = function(bookIndex, booksData) {
    for (var word in booksData) {
        if (this._index[booksData[word]]) {
          if (!~this._index[booksData[word]].indexOf(bookIndex)){
            this._index[booksData[word]].push(bookIndex);
          }
        } else {
            this._index[booksData[word]] = [bookIndex];
        }
    }
};

// Does the searching of the terms in the index
HelperMethods.prototype.doSearch = function(index, terms) {
    var mapFn = function(term) {
        return helper.findIndex(index, term);
    };

    return terms.map(mapFn);
};

var helper = new HelperMethods();
