/*******************************************************
 * Name: Lovelyn Tijesunimi-Israel
 * Title: Inverted Index
 * Description: An Inverted Index object
 *               that takes a JSON array of text objects
 *              and creates an index from the array.
 *******************************************************/
var InvertedIndex = null;

(function () {
    'use strict';

// Define Index class
  InvertedIndex = function() {
    this.index = {};
    this.helper = new HelperMethods();
};

// Define createIndex Function

InvertedIndex.prototype.createIndex = function (filePath, callback) {
    var contentPerBook = '',
        index = {},
        that = this,
        length = 0;

    this.helper.readFile(filePath, function (content) {
        length = content.length;
        var bookInd;
      // Iterates over JSON object, performs cleanUp operation and does indexing
        for (bookInd = 0; bookInd < length; bookInd += 1) {
            contentPerBook = content[bookInd].title + ' ' + content[bookInd].text;
            contentPerBook = that.helper.cleanUp(contentPerBook).split(/\s/);
            that.helper.doIndexing(bookInd, contentPerBook);
        }

        that.index = that.helper.help;
        callback();
    });
};
// End of createIndex function

// Define getIndex function
InvertedIndex.prototype.getIndex = function () {
    return this.index;
};
// End of getIndex function

// Define searchIndex function
InvertedIndex.prototype.searchIndex = function (terms) {
    var result = [];

    // Checks data type returns respective index
    if (Array.isArray(terms)) {
        result = this.helper.doSearch(this.index, terms);
    } else {
        terms = this.helper.cleanUp(terms).split(/\s/);
        result = this.helper.doSearch(this.index, terms);
    }

    return result;
};

// End searchIndex function
})();
