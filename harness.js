const fs = require('fs')
const path = require('path')
const {
   Book,
   Page
} = require('./index')


var b = new Book("title", [new Page('page one', 'section1/section2/file.html', 1)])
// b.addPage()
// b.addPage(new Page('page first', 'section1/section2/file0.html', 0))

console.log(JSON.stringify(b, null, 2))



// var arr = [
//    'readme.html',
//    'section/readme.html',
//    'section\\readme.html',
//    './section/readme.html',
//    'c:/section/readme.html',
//    'top/section//readme.html',
//    '/top/section/readme.html',
//    './readme.md'
// ]


// arr.forEach((p, i) => {
//    var data = path.parse(path.normalize(p))
//    var sections = path.relative(data.root, data.dir)
//    console.log(`${i} - ${JSON.stringify(data)} - ${JSON.stringify(sections.split(path.sep))}`)
// })