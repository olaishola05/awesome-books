const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const formBtn = document.querySelector('.formBtn');
const form = document.querySelector('form');

class Books {
  constructor(title = null, author = null) {
    this.title = title;
    this.author = author;
    this.books = [];
  }

  setBooks(book) {
    this.books = JSON.parse(localStorage.getItem('books'));
    book = new Books(bookTitle.value, bookAuthor.value);
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeBook(title) {
    this.books = JSON.parse(localStorage.getItem('books'));
    this.books = this.books.filter((book) => book.title !== title);
    localStorage.setItem('books', JSON.stringify(this.books));
    // eslint-disable-next-line no-use-before-define
    renderBooks();
  }
}

if (JSON.parse(localStorage.getItem('books')) === null) {
  localStorage.setItem('books', JSON.stringify([]));
}

function renderBooks() {
  const bookContainer = document.querySelector('#book-container');
  const books = JSON.parse(localStorage.getItem('books'));
  let render = '';
  for (let book = 0; book < books.length; book += 1) {
    render += `<div class="books">
        <div class="book-item">
          <div class="book">
            <span>${books[book].title}</span> by
            <span>${books[book].author}</span>
          </div>
          <button type="button" class="book-btns" onclick="removeOnClicked(this)">Remove</button>
        </div>
        
         </div>`;
  }

  bookContainer.innerHTML = render;
}

window.onload = renderBooks();

function addBook(book) {
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    book = new Books(bookTitle.value, bookAuthor.value);
    book.setBooks(book);
    renderBooks();
    form.reset();
  } else {
    const error = document.querySelector('.error');
    error.style.visibility = 'visible';
    error.style.margin = '10px';
    setInterval(() => {
      error.style.visibility = 'hidden';
      error.style.margin = '0';
    }, 5000);
  }
}

// eslint-disable-next-line no-unused-vars
function removeOnClicked(button, book) {
  book = new Books(bookTitle.value, bookAuthor.value);
  this.title = button.parentElement.children[0].children[0].innerHTML;
  book.removeBook(this.title);
}

formBtn.addEventListener('click', addBook);

// date
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currentDate = new Date();
const date = ` ${months[currentDate.getMonth()]} ${currentDate.getDate()} ${currentDate.getFullYear()}`;
const time = currentDate.toLocaleTimeString();
const websiteDate = document.querySelector('.date');
websiteDate.innerHTML = `${date} ${time}`;
