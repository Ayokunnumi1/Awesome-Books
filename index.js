const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addButton = document.querySelector('#add-button');
const bookCollectionContainer = document.querySelector('#book-collection-container');
let books = [];

// constructor function to generate objects from the book title & author added by the user
function AddBook (title, author) {
    this.title = title
    this.author = author
}

// create a function that add books made by the constructor function & push to the books Array
function createBook() {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
        if (title && author) {
            const userAddBook = new AddBook(title, author);
            books.push(userAddBook)
    }
    titleInput.value = '';
    authorInput.value = '';

}

// Attach an addEventListener to the add Button that trigger the bookCollection function to produce the book details inputted by user
addButton.addEventListener('click', function bookCollection() {
    createBook();
    displayBooks();
    });


// create a book function that displays the book objects present in the books array
function displayBooks() {
    bookCollectionContainer.innerHTML = '';
    // create paragraph html containers that would house the user newly created book "title"
    books.forEach(book => {
        const bookParagraphOne = document.createElement('p');
        bookParagraphOne.setAttribute('class', 'p-one');
        bookCollectionContainer.appendChild(bookParagraphOne);
        bookParagraphOne.textContent = book.title;

        // create paragraph html containers that would house the user newly created book "title"
        const bookParagraphTwo = document.createElement('p');
        bookParagraphTwo.setAttribute('class', 'p-two');
        bookCollectionContainer.appendChild(bookParagraphTwo);
        bookParagraphTwo.textContent = book.author;

        const removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'remove-button');
        bookCollectionContainer.appendChild(removeButton);
        removeButton.textContent = 'remove';

    });
}

