const dataBookList = document.querySelector("[data-book-list]")
const dataAddBook = document.querySelector("[data-add-book]")
const dataButtonHeaderAdd = document.querySelector("[data-button-header-add]")
const dataAddNewBookButton = document.querySelector("[data-add-new-book-button]")

//////////// Showing Add new book section
document.addEventListener("click", (e) => {
    if (e.target === dataButtonHeaderAdd) {
        dataAddBook.style.display = ""
        dataBookList.style.display = "none"
    }
})

// Code for dynamical adding books 

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    const bookList = document.querySelector('#book-list');
    bookList.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book');
        bookItem.dataset.index = index;

        const title = document.createElement('h3');
        title.textContent = book.title;
        bookItem.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `By ${book.author}`;
        bookItem.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;
        bookItem.appendChild(pages);

        const read = document.createElement('p');
        read.textContent = book.read ? 'Read' : 'Unread';
        bookItem.appendChild(read);

        const toggleRead = document.createElement('button');
        toggleRead.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
        toggleRead.addEventListener('click', () => {
            book.read = !book.read;
            updateBookItem(bookItem, book);
        });
        bookItem.appendChild(toggleRead);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });
        bookItem.appendChild(deleteButton);

        bookList.appendChild(bookItem);
    });
}

function updateBookItem(bookItem, book) {
    bookItem.querySelector('h3').textContent = book.title;
    bookItem.querySelector('p:first-of-type').textContent = `By ${book.author}`;
    bookItem.querySelector('p:nth-of-type(2)').textContent = `${book.pages} pages`;
    bookItem.querySelector('p:nth-of-type(3)').textContent = book.read ? 'Read' : 'Unread';
    bookItem.querySelector('button:first-of-type').textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
}

const addBookForm = document.querySelector('#add-book form');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = addBookForm.querySelector('#title').value;
    const author = addBookForm.querySelector('#author').value;
    const pages = addBookForm.querySelector('#pages').value;
    const read = addBookForm.querySelector('#read').checked;

    // hiding () Add new book section
    dataAddBook.style.display = "none"
    dataBookList.style.display = ""

    addBookToLibrary(title, author, pages, read);
    addBookForm.reset();
    displayBooks();
});

// example book data
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
// addBookToLibrary("1984", "George Orwell", 328, true);

displayBooks();