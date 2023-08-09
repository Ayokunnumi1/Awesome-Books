const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addButton = document.querySelector('#add-button');
const bookCollectionContainer = document.querySelector('#book-collection-container');

function getFromLocalStorage() {
  const getData = localStorage.getItem('bookArray');
  if (getData) {
    return JSON.parse(getData);
  }
  return [];
  // return getData ? JSON.parse(getData) : [];
}
let books = getFromLocalStorage();

// constructor function to generate objects from the book title & author added by the user
function AddBook(title, author) {
  this.title = title;
  this.author = author;
}

// create a function that add books made by the constructor function & push to the books Array
function createBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (title && author) {
    const userAddBook = new AddBook(title, author);
    // console.log(userAddBook);
    books.push(userAddBook);
  }
  titleInput.value = '';
  authorInput.value = '';
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
