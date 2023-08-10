class BookLibrary {
static titleInput = document.querySelector('#title-input');

static authorInput = document.querySelector('#author-input');

static addButton = document.querySelector('#add-button');

static bookCollectionContainer = document.querySelector('#book-collection-container');

constructor() {
  this.books = getFromLocalStorage();
}

static getFromLocalStorage() {
  this.getData = localStorage.getItem('bookArray');
  if (this.getData) {
    return JSON.parse(this.getData);
  }
  return [];
}

AddBook(title, author) {
  this.title = title;
  this.author = author;
}

static getTitleInput() {
  return BookLibrary.titleInput.value.trim();
}

static getAuthorInput() {
  return BookLibrary.authorInput.value.trim();
}

createBook() {
  if (BookLibrary.titleInput() && BookLibrary.authorInput()) {
    const userAddBook = new AddBook(this.title, this.author);
    this.books.push(userAddBook);
  }
  BookLibrary.titleInput = '';
  BookLibrary.value = '';
}
}

// Create function to set data from the book Array of objects into the browser storage
// firstly convert the book Array to a string to be displayed in the local storage
function setToLocalStorage() {
  localStorage.setItem('bookArray', JSON.stringify(books));
}

// create a book function that displays the book objects present in the books array
function displayBooks() {
  bookCollectionContainer.innerHTML = '';
  // create paragraph html containers that would house the user each newly created book "title"
  books.forEach((book, index) => {
    const bookParagraphOne = document.createElement('p');
    bookParagraphOne.setAttribute('class', 'p-one');
    bookCollectionContainer.appendChild(bookParagraphOne);
    bookParagraphOne.textContent = book.title;

    // create paragraph html containers that would house the user each newly created book "author"
    const bookParagraphTwo = document.createElement('p');
    bookParagraphTwo.setAttribute('class', 'p-two');
    bookCollectionContainer.appendChild(bookParagraphTwo);
    bookParagraphTwo.textContent = book.author;

    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'remove-button');
    bookCollectionContainer.appendChild(removeButton);
    removeButton.textContent = 'remove';
    removeButton.addEventListener('click', () => {
      books = books.filter((book, i) => (i !== index));
      // i is the index of the removed button while index refers to each index in the books array
      // if the index of the filter / remove button is the same as the index of the for each loop,
      // delete /remove that object, ( i === index) remove
      // if not (i !== index) save the remainder objects that don't match,
      // that was not removed in the setToLocalStorage & display them
      setToLocalStorage();
      displayBooks();
    });
  });
}

// Attach an addEventListener to the add Button that trigger the bookCollection function
// to produce the book details inputted by user
addButton.addEventListener('click', () => {
  createBook();
  setToLocalStorage();
});
window.addEventListener('DOMContentLoaded', () => {
  displayBooks();
});
