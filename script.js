

const bookListUL = document.getElementById('bookListUL');
const bookForm = document.getElementById('bookForm');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookIsbn = document.getElementById('bookIsbn');
const duplicateError = document.getElementById('duplicateError');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResultsUL = document.getElementById('searchResultsUL');

const books = [];


function displayBookList(bookArray) {
    bookListUL.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn})`;
        bookListUL.appendChild(li);
    });
}


function addBook(event) {
    event.preventDefault();
    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();
    const isbn = bookIsbn.value.trim();

    if (books.some(book => book.title === title && book.author === author && book.isbn === isbn)) {
        duplicateError.classList.remove('hidden');
        return;
    }

    duplicateError.classList.add('hidden');

    const newBook = { title, author, isbn };
    books.push(newBook);

 
    bookTitle.value = '';
    bookAuthor.value = '';
    bookIsbn.value = '';

    displayBookList();
}


function searchBooks() {
    const query = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book => {
        return (
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.isbn.toLowerCase().includes(query)
        );
    });

    displaySearchResults(filteredBooks); 

}

function displaySearchResults(searchResults) {
    searchResultsUL.innerHTML = ''; 
    searchResults.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        searchResultsUL.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    bookForm.addEventListener('submit', addBook);
    displayBookList(books);

    searchButton.addEventListener('click', searchBooks); 
});
