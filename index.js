/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addButton = document.querySelector('#add-button');
const bookCollectionContainer = document.querySelector('#book-collection-container');

class BookLibrary {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static books = [];

  static getFromLocalStorage() {
    const getData = localStorage.getItem('bookArray');
    if (getData) {
      return JSON.parse(getData);
    }
    return [];
  }

  static getTitleInput() {
    return titleInput.value.trim();
  }

  static getAuthorInput() {
    return authorInput.value.trim();
  }

  static createBook() {
    const title = BookLibrary.getTitleInput();
    const author = BookLibrary.getAuthorInput();
    if (title && author) {
      const newBook = { title, author };
      BookLibrary.books.push(newBook);
    }
    titleInput.value = '';
    authorInput.value = '';
  }

  static setToLocalStorage() {
    return localStorage.setItem('bookArray', JSON.stringify(BookLibrary.books));
  }

  static displayBooks() {
    BookLibrary.getFromLocalStorage();
    bookCollectionContainer.innerHTML = '';
    BookLibrary.books.forEach((book, index) => {
      const bookParagraphOne = document.createElement('p');
      bookParagraphOne.setAttribute('class', 'p-one');
      bookParagraphOne.textContent = book.title;
      bookCollectionContainer.appendChild(bookParagraphOne);

      const bookParagraphTwo = document.createElement('p');
      bookParagraphTwo.setAttribute('class', 'p-two');
      bookParagraphTwo.textContent = book.author;
      bookCollectionContainer.appendChild(bookParagraphTwo);

      const removeButton = document.createElement('button');
      removeButton.setAttribute('class', 'remove-button');
      removeButton.textContent = 'remove';
      removeButton.addEventListener('click', () => {
        BookLibrary.books = BookLibrary.books.filter((_book, i) => (i !== index));
        BookLibrary.setToLocalStorage();
        BookLibrary.displayBooks();
      }),
      bookCollectionContainer.appendChild(removeButton);
    });
  }
}

addButton.addEventListener('click', () => {
  BookLibrary.createBook();
  BookLibrary.setToLocalStorage();
  BookLibrary.displayBooks();
});
window.addEventListener('DOMContentLoaded', BookLibrary.displayBooks());