/*******************************************************
 * Name: Lovelyn Tijesunimi-Israel
 * Title: Inverted Index
 * Description: An Inverted Index object
 * 							that takes a JSON array of text objects
 *        			and creates an index from the array.
 *******************************************************/

// Define Index class
function InvertedIndex() {
    this.index = {};
}

// Define createIndex Function
InvertedIndex.prototype.createIndex = function(filePath) {
    var jsonFile = helper.readFile(filePath),
        len = jsonFile.length,
        contentPerBook = '',
        index = {};

    // Iterates over JSON object, performs cleanUp operation, and does indexing
    for (var bookIndex = 0; bookIndex < len; bookIndex++) {
        contentPerBook = jsonFile[bookIndex].title + ' ' + jsonFile[bookIndex].text;
        contentPerBook = helper.cleanUp(contentPerBook).split(/\s/);
        helper.doIndexing(bookIndex, contentPerBook);
    }

    this.index = helper._index;
};
// End of createIndex function

// Define getIndex function
InvertedIndex.prototype.getIndex = function(filePath) {
    this.createIndex(filePath);
    return this.index;
};
// End of getIndex function

// Define searchIndex function
InvertedIndex.prototype.searchIndex = function(terms) {
    var result = [];

    // Checks data type returns respective index
    if (Array.isArray(terms)) {
        result = helper.doSearch(this.index, terms);
    } else if (terms.indexOf(' ') === -1) {
        result = helper.findIndex(this.index, terms);
    } else {
        terms = helper.cleanUp(terms).split(/\s/);
        result = helper.doSearch(this.index, terms);
    }

    return result;
};
// End searchIndex function
