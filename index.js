/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addButton = document.querySelector('#add-button');
const bookCollectionContainer = document.querySelector('#book-collection-container');
const currentTime = document.querySelector('.current-time');
const addNewLink = document.querySelector('.add-new-link');
const formSection = document.querySelector('.form-section');
const listLink = document.querySelector('.list-link');
const list = document.querySelector('.list');
const contactLink = document.querySelector('.contact-link');
const contactInfo = document.querySelector('.contact-info');

class BookLibrary {
  // constructor(title, author) {
  //   this.title = title;
  //   this.author = author;
  // }

  static books = this.getFromLocalStorage();

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
    const title = this.getTitleInput();
    const author = this.getAuthorInput();
    if (title && author) {
      const newBook = { title, author };
      this.books.push(newBook);
    }
    titleInput.value = '';
    authorInput.value = '';
  }

  static setToLocalStorage() {
    return localStorage.setItem('bookArray', JSON.stringify(this.books));
  }

  static displayBooks() {
    // this.getFromLocalStorage();
    bookCollectionContainer.innerHTML = '';
    this.books.forEach((book, index) => {
      const bookItem = document.createElement('div');
      bookItem.setAttribute('class', 'book-item');
      bookCollectionContainer.appendChild(bookItem);

      const bookParagraph = document.createElement('p');
      bookParagraph.setAttribute('class', 'list-paragraph-text');
      bookParagraph.textContent = `"${book.title}" by ${book.author} `;
      bookItem.appendChild(bookParagraph);

      const removeButtonContainer = document.createElement('div');
      removeButtonContainer.setAttribute('class', 'remove-button-container');
      bookItem.appendChild(removeButtonContainer);

      const removeButton = document.createElement('button');
      removeButton.setAttribute('class', 'remove-button');
      removeButton.textContent = 'remove';
      removeButton.addEventListener('click', () => {
        this.books = this.books.filter((_book, i) => (i !== index));
        this.setToLocalStorage();
        this.displayBooks();
      }),
      removeButtonContainer.appendChild(removeButton);
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
});
window.addEventListener('DOMContentLoaded', () => {
  BookLibrary.displayBooks();
  BookLibrary.updateCurrentTime();
  setInterval(BookLibrary.updateCurrentTime, 1000);
  list.style.display = 'flex';
});
addNewLink.addEventListener('click', () => {
  formSection.style.display = 'flex';
  list.style.display = 'none';
  contactInfo.style.display = 'none';
});
listLink.addEventListener('click', () => {
  BookLibrary.displayBooks();
  list.style.display = 'flex';
  formSection.style.display = 'none';
  contactInfo.style.display = 'none';
});
contactLink.addEventListener('click', () => {
  contactInfo.style.display = 'flex';
  list.style.display = 'none';
  formSection.style.display = 'none';
});
