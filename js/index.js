document.addEventListener("DOMContentLoaded", function() {
    const div = document.getElementById("list-panel")
    const panel = document.getElementById("show-panel")


    function listBooks() {
        fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(books => {
            books.forEach(book => addBook(book))
        })
    }

    function addBook(book) {
        const li = document.createElement("li")
        const ul = div.children[0]
        li.innerText = book.title

        li.addEventListener("click", () => {
            
            panel.innerHTML = ""
            
            const title = document.createElement("h3")
            title.innerText = book.title 

            const image = document.createElement("img")
            image.src = book.img_url

            const description = document.createElement("p")
            description.innerText = book.description

            const btn = document.createElement("button")
            btn.innerText = "Like Book"
            
            btn.addEventListener("click", () => {
                book.users.push({"id":1, "username":"pouros"})
                // debugger
                fetch("http://localhost:3000/books/"+ book.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json", 
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        users: book.users 
                    })
                })
                .then(response => response.json())
                .then(updatedBook => {
                    debugger 
                    const h4 = document.createElement("h4")
                    h4.innerHTML = updatedBook.users[updatedBook.users.length - 1].username 
                    panel.append(h4)
                })
            })
            
            panel.append(title, image, description, btn)    
            book.users.forEach(user => {
                const h4 = document.createElement("h4")
                h4.innerText = user.username
                panel.append(h4)
            })
        })

        ul.append(li)
    }
    
    listBooks()
});
