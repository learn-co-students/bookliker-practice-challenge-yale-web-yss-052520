document.addEventListener("DOMContentLoaded", function() {

   const list = document.getElementById("list")
   const showPanel = document.getElementById("show-panel")
   const currentUser = {"id":1, "username":"pouros"}
   
   function addBook(book){
    const li = document.createElement("li")
    li.innerText = book.title
    list.append(li)
    clickBook(book, li)
   }
   
   function showBook(book) {
    showPanel.innerHTML = ""
    const thumbnail = document.createElement('img')
    thumbnail.src = book.img_url
    const title = document.createElement('h2')
    title.innerText = book.title
    const description = document.createElement('p')
    description.innerText = book.description
    const userList = document.createElement('ul')
    book.users.forEach(user => {
        const li = document.createElement('li')
        li.innerText = user.username
        userList.append(li)
    })
    const button = document.createElement('button')
    button.innerText = "Like"
    button.addEventListener('click', () => {
        const array = book.users
        if (!array.find(user => user.id == 1)) {
            array.push(currentUser)
        } else {
            array.pop()
        }
        const configObject = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                users: array
            })
        }
        fetch(`http://localhost:3000/books/${book.id}`, configObject)
        .then(res => res.json())
        .then(book => showBook(book))
    })
    showPanel.append(thumbnail, title, description, userList, button)
   }

   function clickBook(book, li){
        li.addEventListener('click', () => {
            showBook(book)
        })
   }
   
   fetch(`http://localhost:3000/books`)
   .then(res => res.json())
   .then(books => {
       books.forEach(book => addBook(book))
   })
});
