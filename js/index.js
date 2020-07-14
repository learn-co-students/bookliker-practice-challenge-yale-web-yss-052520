document.addEventListener("DOMContentLoaded", function() {

    const bookList = document.querySelector("ul#list")
    const bookShow = document.querySelector("div#show-panel")

    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then((books) => {
        console.log(books)
        books.forEach( book => {
            addBook(book)
        })
    })

    function addBook(book){
        const li = document.createElement('li')
        const shown = document.createElement('div')
        shown.id = "shown" 
        const title = document.createElement('p')
        title.innerText = book.title 
        
        shown.append(title)

        title.addEventListener('click', function(){
            console.log(book)
            let exists = document.querySelector('div #book' + book.id) 
            if (exists == null){ 
                event.target.style.color = "red" 
                const hidden = document.createElement('div')
                hidden.id = 'book' + book.id 

                const title = document.createElement('h2')
                title.innerText = book.title 

                const description = document.createElement('p')
                description.innerText = book.description

                const thumbnail = document.createElement('img')
                thumbnail.src = book.img_url 

                const likers = document.createElement('ul')
                book.users.forEach(user => { 
                    let liker = document.createElement('li')
                    liker.id = "user-" + user.id + "book-" + book.id 
                    liker.innerText = user.username 
                    likers.append(liker)
                })
                
                const likeButton = document.createElement('p')
                likeButton.className = "like-button" 
                likeButton.id = 'book-' + book.id    
                
                if (book.users.map(user => user.id).includes(1)){
                    likeButton.innerText = '♥'
                }else {
                    likeButton.innerText = '♡'
                }

                likeButton.addEventListener('click', function(){
                    const currentLikers = book.users 
                    const me = {"id":1, "username": 'pouros'}
                    if (currentLikers.map(user => user.id).includes(1)){
                        console.log(currentLikers)
                        let ind = currentLikers.indexOf(me)
                        currentLikers.splice(ind)  
                        let configObj = { 
                            method: 'PATCH', 
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                users: currentLikers
                            }) 
                        }
    
                        fetch("http://localhost:3000/books/" + book.id, configObj ) 
                        .then(res => res.json())
                        .then(book => {
                            likeButton.innerText = '♡' 
                            let userInList = document.querySelector('li#user-1book-' + book.id)
                            userInList.remove() 
                        } ) 

                    }else {
                        currentLikers.push(me) 
                        let configObj = {
                            method: 'PATCH', 
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                users: currentLikers 
                            })                         } 
        
                        fetch("http://localhost:3000/books/" + book.id, configObj ) 
                        .then(res => res.json())
                        .then(book => {
                            likeButton.innerText = '♥' 
                            let newLiker = document.createElement('li')
                            newLiker.innerText = 'pouros '
                            newLiker.id = 'user-1book-' + book.id  
                            likers.append(newLiker) 
                        })
                    } 
                })
                hidden.append(title, thumbnail, description, likers, likeButton) 
                bookShow.append(hidden) 

            }else {
                event.target.style.color = "black" 
                exists.remove() 
            }
        })
        
        li.append(shown) 
        bookList.append(li)
    }
})
