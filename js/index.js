document.addEventListener("DOMContentLoaded", function() {

    const bookUrl = 'http://localhost:3000/books/'
    const userUrl = 'http://localhost:3000/users'
    const bookList = document.querySelector("#list")
    const showPanel = document.querySelector('#show-panel')

    fetch(bookUrl)
    .then(res => res.json())
    .then(books => books.forEach(book => {addBook(book)}))
    
    function addBook(book){
        const li = document.createElement("li")
        li.innerText = book.title
        bookList.append(li)
        li.addEventListener('click',  () => {
            displayBook(book)
        })
    }

    function displayBook(book){
        showPanel.innerHTML = ""
        const img = document.createElement("img")
        img.src = book.img_url
        const p = document.createElement("p")
        p.innerText = book.description
        const ul = document.createElement("ul")
        const btn = document.createElement('button')
        if (book.users.find(user => user.username == "pouros")){
            btn.innerText = 'Unread Book'
        }
        else {
            btn.innerText = 'Read Book'
        }
        book.users.forEach(user => {
            const l = document.createElement("li")
            l.innerText = user.username
            ul.append(l)
        })
        btn.addEventListener("click", () => {
            clickBtn(book)

        })
        showPanel.append(img, p, ul, btn)
    }

    function clickBtn(book){
        if (book.users.find(user => user.username == "pouros")){
            book.users.pop();
        }
        else {
            book.users.push({id: 1, username: "pouros"})
        }
        
        const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            users: book.users
        })}
        
        fetch(bookUrl + book.id, configObj)
        .then(res => res.json())
        .then(data => displayBook(data))
    }
        
});
