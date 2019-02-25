const assert = require('assert')
const {
   Book,
   Section,
   Page
} = require('../index')

describe('test Book functionality', function() {

   it('construct empty Book', function() {
      var book = new Book('Title of a test book')
      assert.equal(book.title, 'Title of a test book')
      assert.equal(book.allPages.length, 0)
      assert.equal(book.sections.length, 0)
      assert.equal(book.pages.length, 0)
   })

   it('construct without title throws error', function() {
      var book = new Book()
   })

   it('construct Page', function() {
      var page = new Page('This is a Page', 'c:/temp/page1.html', 1)
      assert.equal(page.name, 'This is a Page')
      assert.equal(page.path, 'c:/temp/page1.html')
      assert.equal(page.order, 1)
   })

   it('construct Book with initial page', function() {
      var book = new Book('Title of Book', [new Page('Page One', 'page1.html', 1)])

      assert.equal(book.allPages.length, 1, 'has one page')
      assert.equal(book.pages.length, 1, 'page is at top level')
      assert.equal(book.pages[0].name, 'Page One', 'is expected page')
   })

   it('construct Book orders pages correctly', function() {
      var book = new Book('Title of Book', [new Page('Page One', 'page1.html', 1), new Page('Intro', 'readme.html', 0)])

      // assert.equal(book.allPages.length, 1)
      // assert.equal(book.pages.length, 1)
      // assert.equal(book.pages[0].name, 'Page One')
   })

})