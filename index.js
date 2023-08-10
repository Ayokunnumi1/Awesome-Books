/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addButton = document.querySelector('#add-button');
const bookCollectionContainer = document.querySelector('#book-collection-container');
const currentTime = document.querySelector('.current-time');

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
      const bookParagraph = document.createElement('p');
      bookParagraph.setAttribute('class', 'paragraph-text');
      bookParagraph.textContent = `"${book.title}" by ${book.author} `;
      bookCollectionContainer.appendChild(bookParagraph);

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

  static updateCurrentTime() {
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const options = {
      timeZone: currentTimeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const theCurrentTime = new Date().toLocaleString(undefined, options);
    currentTime.textContent = `The Current Time: ${theCurrentTime}`;
  }
}

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  BookLibrary.createBook();
  BookLibrary.setToLocalStorage();
  BookLibrary.displayBooks();
});
window.addEventListener('DOMContentLoaded', () => {
  BookLibrary.displayBooks();
  BookLibrary.updateCurrentTime();
  setInterval(BookLibrary.updateCurrentTime, 1000);
});