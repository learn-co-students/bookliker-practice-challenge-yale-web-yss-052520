document.addEventListener("DOMContentLoaded", function() {
    getBooks()
});

function getBooks(){
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => showBooks(books))
    .catch(error => console.log(error))
  }

function showBooks(books){
    books.forEach(book => {
        addBook(book)
    })
}

function addBook(book){
    const bookList = document.querySelector("ul#list")
    const li = document.createElement("li")
    li.innerText = book.title
    li.addEventListener("click", function() {
        displayBook(book)
    })
    bookList.appendChild(li)
}

function displayBook(book){
    const bookDisplay = document.querySelector("div#show-panel")
    
    bookDisplay.innerHTML = ''
    
    const h1 = document.createElement("h1")
    h1.innerText = book.title

    const img = document.createElement("img")
    img.src = book.img_url

    const p = document.createElement("p")
    p.innerText = book.description

    const ul = document.createElement("ul")
    
    book.users.forEach(user => {
        const li = document.createElement("li")
        li.innerText = user.username
        ul.appendChild(li)
    })

    const btn = document.createElement("button")
    console.log(book.users)
    console.log(book.users.includes({id: 1, username: "pouros"}))
    if (book.users.some(user => user.id === 1)){
        btn.innerText = "Unlike"
        btn.addEventListener("click", function() {
            removeLike(book)
        })
    }      
    else {
        btn.innerText = "Like"
        btn.addEventListener("click", function() {
            addLike(book)
        })
    }

    bookDisplay.append(h1,img,p,ul,btn)

}

function addLike(book) {
    book.users.push({"id":1, "username":"pouros"})
    const configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        users: book.users
        })
    }
    patchBook(book, configObj)
}

function removeLike(book){
    const configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        users: book.users.filter(user => user.id !== 1)
        })
    }
    patchBook(book, configObj)
}

function patchBook(book, request){
    fetch("http://localhost:3000/books/"+book.id, request)
    .then(res => res.json())
    .then(updatedBook => {
        book = updatedBook // this will update the previous book obj with updated book obj
    // updatedBook.users.includes{"id":1, "username":"pouros"} ? btn.innerText = "Like" : btn.innerText = "Unlike"
    displayBook(updatedBook)
    })
}