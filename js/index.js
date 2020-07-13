document.addEventListener("DOMContentLoaded", function() {
    const div = document.getElementById("list-panel")
    

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
            const panel = document.getElementById("show-panel")
            panel.innerHTML = ""
            
            const title = document.createElement("h3")
            title.innerText = book.title 

            const image = document.createElement("img")
            image.src = book.img_url

            const description = document.createElement("p")
            description.innerText = book.description

            const btn = document.createElement("button")
            btn.innerText = "Like Book"
            
            btn.addEventListener("click", function() {console.log("hello")})
            // console.log(btn)
            // btn.addEventListener("click", () => {
                // debugger 
                // fetch("http://localhost:3000/books/"+ book.id, {
                //     method: "PATCH",
                //     headers: {
                //         "Content-Type": "application/json", 
                //         "Accept": "application/json"
                //     },
                //     body: JSON.stringify({
                //         users: book.users.push(
                //             {"id":1, "username":"pouros"}
                //         ) 
                //     })
                // })
            // })
            
            panel.append(title, image, description, btn)    
            book.users.forEach(user => {
                const html = `<h4>${user.username}</h4>`
                panel.innerHTML += html 
            })
        })

        ul.append(li)
    }
    
    listBooks()
});
