var HelperMethods = null;
(function() {
    'use strict';
    HelperMethods = function() {
        this.help = {}; // Cache
    };

    // Define findIndex function to check if a term already exists
    HelperMethods.prototype.findIndex = function(data, term) {
        return data.hasOwnProperty(term) ? data[term] : [];
    };

    // Define cleanUp function that replaces special characters in a string
    HelperMethods.prototype.cleanUp = function(wordsToBeCleaned) {
        return wordsToBeCleaned.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
    };

    HelperMethods.prototype.makeRequest = function(filePath) {
        return $.ajax({
            url: filePath,
            async: true,
            dataType: 'json'
        });
    };

    // Define readFile function that reads the JSON file
    HelperMethods.prototype.readFile = function(filePath, callback) {
        $.when(this.makeRequest(filePath)).done(callback);
    };

    // Does the indexing of the words in the object
    HelperMethods.prototype.doIndexing = function(bookIndex, booksData) {
        var word;
        for (word in booksData) {
            if (this.help[booksData[word]]) {
                if (!~this.help[booksData[word]].indexOf(bookIndex)) {
                    this.help[booksData[word]].push(bookIndex);
                }
            } else {
                this.help[booksData[word]] = [bookIndex];
            }
        }
    };

    // Does the searching of the terms in the index
    HelperMethods.prototype.doSearch = function(index, terms) {
        var that = this,
            mapFn = function(term) {
                return that.findIndex(index, term);
            };

        return terms.map(mapFn);
    };
}());
