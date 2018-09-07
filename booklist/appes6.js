class Book{
  constructor(title, author, isbn){
    this.author = author;
    this.title = title;
    this.isbn = isbn;
  }
}

class UI {
  constructor(){}

  addBookToList(book){
    const list = document.getElementById('book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class='delete'>X</a></td>
      
    `;

    list.appendChild(row);
  }

  removeBookFromList(target){
    if(target.classList.contains('delete')){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    
  }

  showAlert(message, className){
    const div = document.createElement('div');
    div.classList.add('alert');
    div.classList.add(className);
    div.appendChild(document.createTextNode(message));
  
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
  
    container.insertBefore(div, form);
  
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }
}

class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    }
    else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
    
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){

  // get data
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // Instantiating book object
  const book = new Book(title, author, isbn);

  // Instantiate UI object
  const ui = new UI();

  if(title==='' || author==='' || isbn === ''){
    ui.showAlert('Empty fields are not allowed', 'error');
  }
  else{
    
  // add book to UI
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showAlert('Book Added!', 'success');
    ui.clearFields();
  }
  e.preventDefault();
});

// Delete book from the table

document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.removeBookFromList(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Book Removed!', 'success');
  
});