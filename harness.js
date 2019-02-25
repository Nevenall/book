const fs = require('fs')
const path = require('path')
const {
   Book,
   Page
} = require('./index')


// var book = new Book('Title of Book', 'c:/directory/books/TitleOfBook', [
//    new Page('Page One', 'c:/directory/books/TitleOfBook/section1/page1.html', 1),
//    new Page('Page Two', 'c:/directory/books/TitleOfBook/section1/page2.html', 1),
//    new Page('Intro', 'readme.html', 0)
// ])

// console.log(JSON.stringify(book, null, 2))



var arr = [
   'readme.html',
   'section/readme.html',
   'section\\readme.html',
   './section/readme.html',
   'c:/section/readme.html',
   'top/section//readme.html',
   '/top/section/readme.html',
   './readme.md',
   ''
]

// so, we kinda want to remove the root from the page path, if it's there
// normalize yes, resove or relative no


arr.forEach((p) => {
   var normal = path.normalize(p)
   var data = path.parse(normal)


   var relative = path.relative('c:/section', data.dir)
   var resolved = path.resolve(normal)
   console.log(`${p} - ${normal} - ${relative} - ${resolved}`)
})