'use strict'

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
      this.allPages = pages
      this.sections = []
      this.pages = []

      if (title === undefined || title === null || title === '') {
         throw new Error('title is required')
      }
      // todo - frontpage is the lowest order page in the top level
      pages.forEach(page => {
         this.addPage(page)
      })
   }

   /**
    * Add a new page
    * @param {Page} page - a Page to add to the book
    */
   addPage(page) {
      // todo - need to insert the page in the section according to the order param
      var parts = page.path.split("/")
      if (parts.length < 2) {
         // no op
      } else if (parts.length == 2) {
         this.pages.push(page)
      } else {
         var sectionParts = parts.splice(1, parts.length - 2)
         var currentSections = this.sections
         var current = null
         sectionParts.forEach(newSection => {
            current = currentSections.find(s => s.name === newSection)
            if (current == null) {
               current = new Section(newSection)
               currentSections.push(current)
            }
            currentSections = current.sections
         })
         current.pages.push(page)
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