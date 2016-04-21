/*******************************************************
 * Name: Lovelyn Tijesunimi-Israel
 * Title: Inverted Index
 * Description: An Inverted Index object
 * 							that takes a JSON array of text objects
 *        			and creates an index from the array.
 *******************************************************/

(function() {
  'use strict';

  describe ('Inverted Index test cases', function () {
    var index = new InvertedIndex();
    var result;

    beforeEach(function(done) {
      result = index.createIndex('books.json');
       done();
      });

    describe ('Check if class exists', function () {
      it ('checks that class is defined', function () {
        expect (InvertedIndex).toBeDefined();
      });
    });

    describe ('Read book data', function () {
      it ('readFile method should not return empty JSON', function () {
      var jsonFile = index.readFile('books.json');
      expect (jsonFile.length).toBeGreaterThan(0);
      expect (jsonFile).not.toBe([]);
      });

    });

    describe ('Populate index', function () {
      it ('verifies that index is created once jsonFile is read', function () {
      expect (index.data).toBeDefined();
      });

      it ('verifies that index is correct', function () {
      expect (index.data.alice).toEqual([0]);
      expect (index.data.of).toEqual([0,1]);
      expect (index.data.lord).toEqual([1]);
      expect (index.data.wonderful).toBeUndefined();
      });
    });

    describe ('Search index', function () {
      it ('verifies that search returns correct result', function () {
      expect (index.searchIndex('alice wonderland')).toEqual([[0],[0]]);
      expect (index.searchIndex('lord ring of')).toEqual([[1],[1],[0,1]]);
      expect (index.searchIndex('the')).toEqual([1]);
      expect (index.searchIndex('they')).not.toEqual([1]);
      });

      it('verifies searching an index returns array of indices of correct object', function() {
      expect (index.searchIndex('into')).toEqual([0]);
      expect (index.searchIndex('wizard')).toEqual([1]);
      expect (index.searchIndex('a')).toEqual([0, 1]);
      expect (index.searchIndex('of')).toEqual([0, 1]);
      expect (index.searchIndex('lord')).toEqual([1]);
      expect (index.searchIndex('elf')).toEqual([1]);
      expect (index.searchIndex('elven')).not.toEqual([0]);
      });

      it('can handle varied number of search terms', function() {
      expect(index.searchIndex('alice in wonderland')).toEqual([[0],[0],[0]]);
      expect(index.searchIndex('lord of the rings')).toEqual([[1],[0, 1],[1],[1]]);
      expect(index.searchIndex('an unusual alliance of man')).toEqual([[1],[1],[1],[0, 1],[1]]);
      expect(index.searchIndex('me under allow if money')).not.toEqual([[1],[1],[1],[0, 1],[1]]);
      });

      it('ensures search can handle an array of words', function() {
      expect(index.searchIndex(['alice', 'wonderland', 'in'])).toEqual([[0],[0],[0]]);
      expect(index.searchIndex(['lord', 'of', 'the', 'rings'])).toEqual([[1],[0, 1],[1],[1]]);
      expect(index.searchIndex(['an', 'unusual', 'alliance', 'of', 'man'])).toEqual([[1],[1],[1],[0, 1],[1]]);
      expect(index.searchIndex(['me', 'under', 'allow', 'if', 'money'])).not.toEqual([[1],[1],[1],[0, 1],[1]]);
      });

      it('ensures search can handle edge cases', function() {
        expect(index.searchIndex(['alice', 'bicycle', 'in'])).toEqual([[0],[],[0]]);
        expect(index.searchIndex(['alive', 'bicycle', 'on'])).toEqual([[],[],[]]);
        expect(index.searchIndex(['alive', 'bicycle', 'on'])).not.toEqual([[0],[1],[1]]);
      });
  });

  });
})();
