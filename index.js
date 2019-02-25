'use strict'

const fs = require('fs')
const path = require('path')

/**
 * Data-model for a Book
 */
class Book {
   /**
    * Construct a book
    * @param {string} title - title of the book
    * @param {Page[]} pages - an array of {Page} objects to initialize the book with
    */
   constructor(title, pages = []) {
      this.title = title
      this.allPages = []
      this.sections = []
      this.pages = []
      //this.frontPage = new Page('Introduction', 'readme.html', 1, '<h1>Introduction</h1>')

      if (title === undefined || title === null || title === '') {
         throw new Error('title is required')
      }

      pages.forEach(page => {
         this.addPage(page)
      })
   }

   /**
    * Add a new page
    * @param {Page} page - a Page to add to the book
    */
   addPage(page) {
      // normalize page path
      page.path = path.normalize(page.path)

      this.allPages.push(page)

      var data = path.parse(page.path)
      var sectionNames = path.relative(data.root, data.dir).split(path.sep)

      var section = null
      var sections = this.sections

      sectionNames.forEach(sectionName => {
         if (sectionName === '') {
            // insert page into root
            insert(page, this.pages)
         } else {
            // find section or create it
            section = sections.find(el => el.name === sectionName)
            if (section == null) {
               section = new Section(sectionName)
               sections.push(section)
            }
            sections = section.sections
         }
      })

      if (section != null) {
         // if there is a section, insert page into it
         insert(page, section.pages)
      }


      function insert(page, pages) {
         var index = pages.findIndex(p => page.order < p.order)
         if (index === -1) {
            pages.push(page)
         } else {
            pages.splice(index, 0, page)
         }
        
      }
   }
}

/**
 * A collection of sections and pages
 */
class Section {
   /**
    * @param {string} name - the name of the section
    */
   constructor(name) {
      this.name = name
      this.pages = []
      this.sections = []
   }
}

/**
 * An individual page in a book
 */
class Page {
   /**
    * @param {string} name - name of the page
    * @param {string} path - the path to the page content
    * @param {number} order - the order pages should appear in
    */
   constructor(name, path, order) {
      this.name = name
      this.path = path
      this.order = order
   }
}

module.exports = {
   Book,
   Section,
   Page
}