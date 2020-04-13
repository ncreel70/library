let myLibrary = [];



function Book(title, author, pages, haveRead) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function getRadioValue() {
    let ele = document.getElementsByName('haveRead');
    for(let i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            return ele[i].value;
        }
    }
}

function addBook(e) {
    e.preventDefault();
    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('numPages').value;
    let bookRead = getRadioValue();
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBook);
    document.forms[0].reset();

    localStorage.setItem('MyLibrary', JSON.stringify(myLibrary));

    let obj = localStorage.getItem('MyLibrary');

    for (var i = 0; i < obj.length; i++) {
        var tr = "<tr>";
    
        /* Must not forget the $ sign */
        tr += "<td>" + obj[i].key + "</td>" + "<td>$" + obj[i].value.toString() + "</td></tr>";
    
        /* We add the table row to the table body */
        tbody.innerHTML += tr;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', addBook)
})