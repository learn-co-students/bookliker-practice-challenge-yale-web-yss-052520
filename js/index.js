document.addEventListener("DOMContentLoaded", function() {

    let displayList = document.querySelector('ul#list')
    let showPanel = document.querySelector('div#show-panel')
    let selfUser = {"id":1, "username":"pouros"}

    function ce(element){
        return document.createElement(element)
    }

    function fetchBooks(){
        fetch('http://localhost:3000/books')
        .then(res => res.json())
        .then(json => addBooks(json))

    }

    function addBooks(books){
        books.forEach(book => addBook(book))
    }

    function addBook(book){        
        let div = ce('div')
        let li = ce('li')
        li.innerText = book.title
        displayList.append(li)

        li.addEventListener('click', () => renderBook(book))

        function renderBook(book) {
            div.innerHTML = ""
            showPanel.innerHTML = ""

            let id = ce('h3')
            id.innerText = `Id: ${book.id}`

            let title = ce('h3')
            title.innerText = `Title: ${book.title}` 

            let image = ce('img')
            image.src = book.img_url

            let p = ce('p')
            p.innerText = `Description: ${book.description}`

            let likes = ce('ul')
            likes.innerText = "Users who liked this book: "
            book.users.forEach(user => {
                let like = ce('li')
                like.innerText = user.username
                likes.append(like)
            })

            let likeBtn = ce('button')
            if (book.users.some(user => user.username === selfUser.username)) {
                likeBtn.innerText = "Unlike"
            }
            else{
                likeBtn.innerText = "Like"
            }

            div.append(id, title, image, p, likes, likeBtn)
            showPanel.append(div)

            likeBtn.addEventListener('click', () => {                

                let updatedUsers = book.users
                
                if (likeBtn.innerText === "Like") {
                    updatedUsers.push(selfUser)
                }
                else{
                    updatedUsers = updatedUsers.filter(user => user.username != selfUser.username)
                }

                let configObj = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "users": updatedUsers
                    })
                }
    
                fetch(`http://localhost:3000/books/${book.id}`, configObj)
                .then(res => res.json())
                .then(book => renderBook(book))
            })

            
        }
    }

    fetchBooks()

}
)
