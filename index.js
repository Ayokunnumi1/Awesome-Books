document.addEventListener('DOMContentLoaded', () => {
  class BookLibrary {
    static titleInput = document.querySelector('#title-input');

    static authorInput = document.querySelector('#author-input');

    static addButton = document.querySelector('#add-button');

    static bookCollectionContainer = document.querySelector('#book-collection-container');

    constructor() {
      this.books = this.getFromLocalStorage();
      this.addButton.addEventListener('click', () => {
        this.createBook();
        this.setToLocalStorage();
        this.displayBooks();
      });

      getFromLocalStorage(); {
      this.getData = localStorage.getItem('bookArray');
      if (this.getData) {
        return JSON.parse(this.getData);
      }
      return [];
    }

    static getTitleInput() {
      return BookLibrary.titleInput.value.trim();
    }

    static getAuthorInput() {
      return BookLibrary.authorInput.value.trim();
    }

    createBook() {
      const title = BookLibrary.getTitleInput();
      const author = BookLibrary.getAuthorInput();
      if (title && author) {
        const newBook = { title, author };
        this.books.push(newBook);
      }
      BookLibrary.titleInput.value = '';
      BookLibrary.authorInput.value = '';
    }

    setToLocalStorage() {
      localStorage.setItem('bookArray', JSON.stringify(this.books));
    }

    displayBooks() {
      this.bookCollectionContainer.innerHTML = '';
      this.books.forEach((book, index) => {
        const bookParagraphOne = document.createElement('p');
        bookParagraphOne.setAttribute('class', 'p-one');
        bookParagraphOne.textContent = book.title;
        this.bookCollectionContainer.appendChild(bookParagraphOne);

        const bookParagraphTwo = document.createElement('p');
        bookParagraphTwo.setAttribute('class', 'p-two');
        bookParagraphTwo.textContent = book.author;
        this.bookCollectionContainer.appendChild(bookParagraphTwo);

        const removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'remove-button');
        removeButton.textContent = 'remove';
        removeButton.addEventListener('click', () => {
          this.books = this.books.filter((book, i) => (i !== index));
          this.setToLocalStorage();
          this.displayBooks();
        }),
        this.bookCollectionContainer.appendChild(removeButton);
      });
    }
  }
  const myBookLibrary = new BookLibrary();
});
