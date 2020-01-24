/*********************
      Dom Hooks
**********************/
let formDom = document.querySelector("form");
let titleDom = document.querySelector("#title");
let authorDom = document.querySelector("#author");
let isbnDom = document.querySelector("#isbn");
let submitDom = document.querySelector("button");
let tableDom = document.querySelector("table");

/*********************
      Constructor
**********************/
function Book(id, title, author, isbn) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

/*********************
      List Books
**********************/
let books;
function listBooks() {
  books = JSON.parse(localStorage.getItem("books"));
  console.log(books);
  if (books == null) {
    books = [];
  } else {
    books.forEach(function(book) {
      appendBookToDom(book);
    });
  }
}
listBooks();

/*********************
  Append Book to Dom
**********************/
function appendBookToDom(book) {
  let rowDom = document.createElement("tr");
  rowDom.id = book.id;

  let dataTitleDom = document.createElement("td");
  dataTitleDom.innerHTML = book.title;

  let dataAuthorDom = document.createElement("td");
  dataAuthorDom.innerHTML = book.author;

  let dataIsbnDom = document.createElement("td");
  dataIsbnDom.innerHTML = book.isbn;

  let dataXDom = document.createElement("td");
  dataXDom.className = "remove";
  dataXDom.innerHTML = "X";

  rowDom.appendChild(dataTitleDom);
  rowDom.appendChild(dataAuthorDom);
  rowDom.appendChild(dataIsbnDom);
  rowDom.appendChild(dataXDom);
  tableDom.appendChild(rowDom);
  titleDom.value = "";
  authorDom.value = "";
  isbnDom.value = "";
}

/*********************
    Calculate Obj ID
**********************/
function getObjectId() {
  let id = JSON.parse(localStorage.getItem("lastId"));
  if (id == null) {
    id = 1;
  } else {
    id = Number(id) + 1;
  }
  localStorage.setItem("lastId", JSON.stringify(id));
  return id;
}

/*********************
    Add Book Event
**********************/
submitDom.addEventListener("click", function(e) {
  e.preventDefault();

  if (titleDom.value == "" || authorDom.value == "" || isbnDom.value == "") {
    submitDom.innerHTML = "All fields required";
    submitDom.style.color = "red";
    return;
  }

  let book = new Book(
    getObjectId(),
    titleDom.value,
    authorDom.value,
    isbnDom.value
  );
  console.log(JSON.stringify(book));

  appendBookToDom(book);
  books.push(book);
  console.log(JSON.stringify(books));
  localStorage.setItem("books", JSON.stringify(books));
});

/*********************
      Input Event
**********************/
formDom.addEventListener("click", function(e) {
  if (e.target.nodeName.toLowerCase() == "input") {
    submitDom.innerHTML = "Add Book";
    submitDom.style.color = "#191919";
  }
});

/*********************
      X Event
**********************/
tableDom.addEventListener("click", function(e) {
  if (e.target.className == "remove") {
    let bookIdDom = e.target.parentElement.id;
    books.forEach(function(book) {
      if (book.id == bookIdDom) {
        books.splice(books.indexOf(book), 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
    e.target.parentElement.remove();
  }
});
