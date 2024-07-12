


//const API_URL = 'http://localhost:3000';
// document.addEventListener('DOMContentLoaded', () => {
//     fetchAuthors();
//     fetchBooks();

//     const authorForm = document.getElementById('author-form');
//     authorForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const authorName = document.getElementById('author-name').value;
//         if (authorName) {
//             await createAuthor(authorName);
//             document.getElementById('author-name').value = '';
//             fetchAuthors();
//         }
//     });

//     const bookForm = document.getElementById('book-form');
//     bookForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const bookTitle = document.getElementById('book-title').value;
//         const bookAuthor = document.getElementById('book-author').value;
//         if (bookTitle && bookAuthor) {
//             await createBook(bookTitle, bookAuthor);
//             document.getElementById('book-title').value = '';
//             document.getElementById('book-author').value = '';
//             fetchBooks();
//         }
//     });
// });

// async function fetchAuthors() {
//     const response = await fetch(`${API_URL}/authors`);
//     const authors = await response.json();
//     const authorsList = document.getElementById('authors-list');
//     const bookAuthorSelect = document.getElementById('book-author');
//     authorsList.innerHTML = '';
//     bookAuthorSelect.innerHTML = '<option value="">Select Author</option>';
//     authors.forEach(author => {
//         const li = document.createElement('li');
//         li.textContent = author.name;
//         authorsList.appendChild(li);

//         const option = document.createElement('option');
//         option.value = author._id;
//         option.textContent = author.name;
//         bookAuthorSelect.appendChild(option);
//     });
// }

// async function fetchBooks() {
//     const response = await fetch(`${API_URL}/books`);
//     const books = await response.json();
//     const booksList = document.getElementById('books-list');
//     booksList.innerHTML = '';
//     books.forEach(book => {
//         const li = document.createElement('li');
//         li.textContent = `${book.title} by ${book.authorId.name}`;
//         booksList.appendChild(li);
//     });
// }

// async function createAuthor(name) {
//     await fetch(`${API_URL}/authors`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name })
//     });
// }

// async function createBook(title, authorId) {
//     await fetch(`${API_URL}/books`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ title, authorId })
//     });
// }
const authorForm = document.getElementById('author-form');
authorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const author=document.querySelector('#author-name').value;
    fetch('/author',{
        method: 'POST',
        body: JSON.stringify({author})
    });
});