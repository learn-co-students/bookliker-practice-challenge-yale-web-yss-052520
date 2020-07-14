

document.addEventListener("DOMContentLoaded", function() {
    function qs(selector){
            return document.querySelector(selector)
    }

    function ce(element){
            return document.createElement(element)
    }
    const selfUser = {"id":1, "username":"pouros"}

    function getBooks(){
            return fetch('http://localhost:3000/books')
            .then(res => res.json())
            .then(books => showBooks(books))
    }

    function showBooks(books){
            books.forEach(book => {
                    addBook(book)
            })
    }

    function addBook(book){
            let book_ul = qs("ul#list")
            let title_li = ce("li")
            title_li.innerText = book.title
            book_ul.append(title_li) 
            title_li.addEventListener('click', () => renderShowPanel(book))
    }

    // Fetch all books
    getBooks()

    function renderShowPanel(book){
            let panel = qs("div#show-panel")
            
            // Remove previous panel
            while(panel.firstChild){
                panel.removeChild(panel.firstChild);
            }
            
            let h2 = ce('h2')
            h2.innerText = book.title

            let p = ce("p")
            p.innerText = book.description

            let img = ce('img')
            img.setAttribute('src', book.img_url)

            let likes = ce('ul')
            // function updateUsers(book){
            book.users.forEach(user => {
                let like = ce('li')
                like.innerText = user.username
                likes.append(like)
            })
            // }
            
            let likeBtn = ce("button")
            if (book.users.some(user => user.username === selfUser.username)) {
                likeBtn.innerText = "Unlike"
            }
            else{
                likeBtn.innerText = "Like"
            }
            
            
            panel.append(h2, p, img, likes, likeBtn)

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
                .then(book => renderShowPanel(book))
            })
        }

});



        
        
        
        
        
        
        
        
        
        
        


    // "id": 1,
    //   "title": "Picture Perfect",
    //   "description": "When her seven-year-old nephew, a hemophiliac, mysteriously disappears during their camping trip, pediatrician Lorrie Ryan races against time to find the missing boy with the help of FBI agent Stuart Saunders. Previously published as Panda Bear Is Critical. Reprint.",
    //   "img_url": "http://books.google.com/books/content?id=CEMZ1OoPDIAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    //   "users": [
    //     {
    //       "id": 2,
    //       "username": "auer"
    //     },




























