//class Book : Represents a Book
class Book{
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
}


//class UI : Handles UI tasks
class UI{
    static displayBooks() {
        const storedBooks = Store.getBooks();
      
        const books = storedBooks;
        books.forEach(book => {
            UI.addBookToList(book);
        })
    }

    static addBookToList(book) {
        const list = document.querySelector('.book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><a href="#" class="btn btn-outline-danger btn-sm delete">Delete</a></td>
        `;
        list.appendChild(row);
    }

    static showAlerts(message, className) {
        
        const msg = document.querySelector('.msg');
        msg.style.opacity = 1;
        msg.classList.add(`alert-${className}`);
        msg.textContent = message;

        setTimeout(() => {
            msg.style.opacity = '0';
            // msg.textContent = '';
            msg.classList.remove(`alert-${className}`);
        },2000);
    }

    static clearFields() {
        document.querySelector('#id').value = '';
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}

//class Store : Handles storage
class Store{
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        } 

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(id) {
        const books = Store.getBooks();
        console.log(id)
        books.forEach((book, index) => {
            if (book.id === id) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks());

//Event: Add a Book
const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //Get form values
    const id = document.querySelector('#id').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    //Validate
    if (id === '' || title === '' || author === '') {
        UI.showAlerts('Please fill in all the fields', 'danger');
    } else {
        //Instantiate a book
        const book = new Book(id, title, author);

        //Add book to UI
        UI.addBookToList(book);

        //Add to Local Storage
        Store.addBook(book);

        UI.showAlerts('Book Added', 'info');

        //Clear fields
        UI.clearFields();
    }

})


//Remove a Book
const list = document.querySelector('.book-list');
list.addEventListener('click', (e) => {

    //Remove Book from UI
    UI.deleteBook(e.target);

    //Remove Book from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    UI.showAlerts('Book Deleted', 'danger');    
})
