const assert = require('assert')
const {
   Book,
   Page
} = require('../index')

describe('test Book()', function() {

   it('construct empty Book', function() {
      var book = new Book('Title of a test book')
      assert.equal(book.title, 'Title of a test book')
      assert.equal(book.allPages.length, 0)
      assert.equal(book.sections.length, 0)
      assert.equal(book.pages.length, 0)
   })

   it('Book without title throws error', function() {
      assert.throws(() => {
         new Book()
      }, {
         name: 'Error',
         message: 'title is required'
      })
   })

   it('construct Page', function() {
      var page = new Page('This is a Page', 'c:/temp/page1.html', 1)
      assert.equal(page.name, 'This is a Page')
      assert.equal(page.path, 'c:/temp/page1.html')
      assert.equal(page.order, 1)
   })

   it('construct Book with initial page', function() {
      var book = new Book('Title of Book', '', [new Page('Page One', 'page1.html', 1)])

      assert.equal(book.allPages.length, 1, 'has one page')
      assert.equal(book.pages.length, 1, 'page is at top level')
      assert.equal(book.pages[0].name, 'Page One', 'is expected page')
   })

   it('construct Book orders pages correctly', function() {
      var book = new Book('Title of Book', '', [new Page('Page One', 'page1.html', 1), new Page('Intro', 'readme.html', 0)])

      assert.equal(book.allPages.length, 2)
      assert.equal(book.pages.length, 2, 'pages at root')
      assert.equal(book.pages[0].name, 'Intro', 'Intro page is first')
   })

   it('book with root created sections correctly', function() {
      var book = new Book('Title of Book', 'c:/directory/books/TitleOfBook', [
         new Page('Page One', 'c:/directory/books/TitleOfBook/section1/page1.html', 1),
         new Page('Page Two', 'c:/directory/books/TitleOfBook/section1/page2.html', 1),
         new Page('Intro', 'readme.html', 0)
      ])

      assert.equal(book.sections.length, 1, 'expect one section')
      assert.equal(book.sections[0].name, 'section1')
      assert.equal(book.sections[0].pages.length, 2, 'expect two pages in section1')
      assert.equal(book.pages.length, 1, 'expect 1 page in root')
   })

})