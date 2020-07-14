document.addEventListener("DOMContentLoaded", function() {
    const url = 'http://localhost:3000/books'
    const userurl = 'http://localhost:3000/users'

    const bookList = document.querySelector('#list')
    const showPanel = document.querySelector('#show-panel')
    
    fetch(userurl).then(res => res.json()).then(json => self = json[0])


    function showBook(book) {
    
        let liked = book.users.some(e => {
            // debugger
            return e.username == self.username
        })

        showPanel.innerHTML = null

        const h2 = document.createElement('h2')
        h2.innerText = book.title

        const p = document.createElement('p')
        p.innerText = book.description

        const img = document.createElement('img')
        img.src = book.img_url

        const userList = document.createElement('ul')
        book.users.forEach( el => {
            const userLi = document.createElement('li')
            userLi.innerText = el.username
            userList.append(userLi)
        })

        const likebtn = document.createElement('button')
        
        likebtn.innerText = liked ? "Unlike this Book" : "Like this Book"
        
        likebtn.addEventListener("click", () => {
            // debugger
            book.users = liked ? book.users.filter(e => e.username != self.username) : book.users.concat([self])
            // liked = !liked
            const configObj = {
                mode: "cors",
                headers: {'Content-Type': 'application/json'},
                method: 'PATCH',
                body: JSON.stringify({"users": book.users}) 
            }
            fetch(`${url}/${book.id}`, configObj).then(res => res.json()).then(json => {
                showBook(json)
            })
        })

        showPanel.append(h2, p, img, userList, likebtn)



    }

    function addBook(book) {
        const bookLi = document.createElement('li')
        bookLi.innerText = book.title
        bookLi.addEventListener("click", () => {
            showBook(book)
        })

        bookList.append(bookLi)
    }

    function listBooks(json) {
        json.forEach(el => addBook(el))
    }
    
    function renderBooks() {
        fetch(url).then(res => res.json()).then(json => listBooks(json))
    }
    renderBooks()
});

