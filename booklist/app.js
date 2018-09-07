// Book Constructor
function Book(title, author, isbn){
  this.author = author;
  this.title = title;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book){
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

UI.prototype.removeBookFromList = function(row){
  row.remove();
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  
}

UI.prototype.showAlert = function(message, className){
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
    ui.showAlert('Book Added!', 'success');
    ui.clearFields();
  }
  e.preventDefault();
});

// Delete book from the table

document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();

  if(e.target.classList.contains('delete')){
    ui.removeBookFromList(e.target.parentElement.parentElement);
    ui.showAlert('Book Removed!', 'success');
  }
});

