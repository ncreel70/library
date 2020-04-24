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
}

function makeTable() {
    const rows = JSON.parse(localStorage.getItem('MyLibrary'));
    let html = '<table>';
    html += '<tr>';
    for(let j in rows[0]) {
        if(j != 'id') {
            html += '<th>' + j + '</th>';
        }
    }
    html += '</tr>';
    for(let i = 0; i < rows.length; i++) {
        html += '<tr>';
        for(let j in rows[i]) {
            if(j != 'id') {
                html += '<td>' + rows[i][j] + '</td>';
            }
        }
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById('container').innerHTML = html;
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', addBook)
    document.getElementById('submitBtn').addEventListener('click', makeTable)
})