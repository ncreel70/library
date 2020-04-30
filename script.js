let myLibrary = JSON.parse(localStorage.getItem('MyLibrary')) || [];



function Book(title, author, pages, haveRead) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function loadStorage() {
    let parsedData = myLibrary;
    return parsedData;
}

function storeLocal() {
    localStorage.setItem('MyLibrary', JSON.stringify(myLibrary));
}


function getRadioValue() {
    let ele = document.getElementsByName('haveRead');
    for(let i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            return ele[i].value;
        }
    }
}

function updateBook(book) {
    myLibrary.push(book);
    storeLocal();
}

function addBook(e) {
    e.preventDefault();
    let bookTitle = document.getElementById('title').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('numPages').value;
    let bookRead = getRadioValue();
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    updateBook(newBook);
    document.forms[0].reset();
    draw();
}

function draw() {
    const obj = loadStorage();
    let html = '<table>';
    html += '<tr>';
    for(let j in obj[0]) {
        if(j != 'id') {
            html += '<th>' + j + '</th>';
        }
    }
    html += '</tr>';
    for(let i = 0; i < obj.length; i++) {
        html += '<tr>';
        for(let j in obj[i]) {
            if(j == 'haveRead') {
                if(obj[i].haveRead == 'yes'){
                    html += '<td>' + '<select id =' + obj[i].id + ' class = "readStatus"><option value = "yes" selected>Yes</option><option value = "no">No</option></select>';
                } else {
                    html += '<td>' + '<select id =' + obj[i].id + ' class = "readStatus"><option value = "yes">Yes</option><option value = "no" selected>No</option></select>';
                }
                
            } 
            else if (j == 'id') {
                continue;
            } 
            else {
                html += '<td>' + obj[i][j] + '</td>';
            }
        }
        html += '<td> <button id =' + obj[i].id + ' class = "deleteBtn">Delete</button>' 
        html += '</tr>';
    }
    html += '</table>';
    document.getElementById('container').innerHTML = html;
    addDeleteClickEvent();
    addReadSelectionEvent();
}

function deleteId() {
   let obj = myLibrary;
   for(let i = 0; i < obj.length; i++){
       if(obj[i].id != this.id){
           continue;
        } else {
            obj.splice(i, 1);
            storeLocal();
            draw();
        }
    }
    
};

function updateReadStatus() {
    let obj = myLibrary;
    for(let i = 0; i < obj.length; i++) {
        if(obj[i].id != this.id) {
            continue;
        } else {
            obj[i].haveRead = this.options[this.selectedIndex].value;
            storeLocal();
            draw();
        }
    }
}

function addDeleteClickEvent() {
    let elements = document.getElementsByClassName('deleteBtn');
    
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', deleteId)
    }
}

function addReadSelectionEvent() {
    let elements = document.getElementsByClassName('readStatus');
    
    for(let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('change', updateReadStatus)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', addBook)
   
})

draw();