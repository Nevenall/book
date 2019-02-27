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
    * @param {string} root - the root directory of the book. Only sub-directories will be created as sections
    * @param {Page[]} pages - an array of {Page} objects to initialize the book with
    */
   constructor(title, root = '', pages = []) {

      if (title === undefined || title === null || title === '') {
         throw new Error('title is required')
      }

      this.title = title
      if (root.length > 0) {
         this.root = path.normalize(root)
      } else {
         this.root = root
      }
      this.allPages = []
      this.sections = []
      this.pages = []
      // todo - add a front page which we can specify, or defaults to the first readme at root level.

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
      var sectionNames = data.dir.replace(this.root, '').split(path.sep)

      if (sectionNames.length == 1 && sectionNames[0] === '') {
         // insert page into root
         insert(page, this.pages)
      } else {
         var section = null
         var sections = this.sections

         sectionNames.forEach(sectionName => {
            if (sectionName !== '') {
               // find section or create it
               section = sections.find(el => el.name === sectionName)
               if (section == null) {
                  section = new Section(sectionName)
                  sections.push(section)
               }
               sections = section.sections
            }
         })
         // insert into the section we found
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

   // todo - fix the name collision and normalize the page path here
   // todo - add the ability to fetch the contents of the page by path
   // todo - allow for providing content in the constructor
   // todo - allow for adding custom data to pages?

}

module.exports = {
   Book,
   Section,
   Page
}