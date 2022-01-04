const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const formBtn = document.querySelector('.formBtn');
const form = document.querySelector('form');

let books = [];
// localStorage.setItem('books', JSON.stringify(books));
const setBooks = (book) => {
  books = JSON.parse(localStorage.getItem('books'));
  book = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};

function renderBooks() {
  const bookContainer = document.querySelector('#book-container');
  books = JSON.parse(localStorage.getItem('books'));
  let render = '';
  for (let book = 0; book < books.length; book += 1) {
    render += `<div class="books">
        <div class="book-item">
          <div class="book">
            <p>${books[book].title}</p>
            <span>${books[book].author}</span>
          </div>
          <button type="button" class="book-btns" book-index="${book}" onclick="removeOnClicked(this)">Remove</button>
        </div>
        <hr />
         </div>`;
  }

  bookContainer.innerHTML = render;
}
window.onload = renderBooks();

const addBook = (book) => {
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    book.title = bookTitle.value;
    book.author = bookAuthor.value;
    setBooks(book);
    renderBooks();
    form.reset();
  } else {
    const error = document.querySelector('.error');
    error.style.visibility = 'visible';
    setInterval(() => {
      error.style.visibility = 'hidden';
    }, 3000);
  }
};

function removeBook(title) {
  books = JSON.parse(localStorage.getItem('books'));
  books = books.filter((book) => book.title !== title);
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
}

function removeOnClicked(button) {
  const title = button.parentElement.children[0].children[0].innerHTML;
  removeBook(title);
}
// const bookBtns = document.querySelectorAll('.book-btns');
// for (let i = 0; i < bookBtns.length; i += 1) {
//   bookBtns[i].addEventListener('click', () => {
//     if (bookBtns[i]) {
//       removeBook(bookBtns[i]);
//       console.log(bookBtns[i]);
//     }
//   });
// }

formBtn.addEventListener('click', addBook);
