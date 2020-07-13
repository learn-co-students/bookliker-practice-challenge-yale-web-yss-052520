document.addEventListener("DOMContentLoaded", function() {
	fetchBooks()
});

function fetchBooks() {
	fetch('http://localhost:3000/books')
	.then(res => res.json())
	.then(getBooks => showBooks(getBooks))
}

function ce(element){
	return document.createElement(element)
}

function appendBook(book) {
	const item = ce('li')
	item.innerText = book.title
	var list = document.querySelector('ul#list')
    list.appendChild(item)
    return item
}

function showBooks(books) {
	books.forEach(book => {
		let listItem = appendBook(book)
        makeClickable(listItem, book)
    }) 
}

function makeClickable(element, book){
    element.addEventListener('click', () => {showPanel(book)})
}

function showPanel(book){
    let panel = document.querySelector('#show-panel')
    panel.innerHTML = ""
    // childNodes.forEach( node => node.remove())

    let h2 = ce("h2")
    h2.innerText = book.title

    let img = ce("img")
    img.src = book.img_url

    let p = ce("p")
    p.innerText = book.description

    let btn = ce("button")
    if (book.user.includes(currentUser)){
        btn.innerText = "Remove Book"
    }else{
        btn.innerText = "Read Book"
    }
    
    btn.addEventListener("click",  () => {

        let currentUser = {"id": 1, "username": "pouros"}
        
         book.user.includes(currentUser)? book.users.filter(usr => usr == currentUser) : book.users.push(currentUser)
            
        // let updatedUsers = book.users
        // if (updatedUsers.lengthincludes(currentUser)){
        //     updatedUsers = book.users.filter(usr => usr == currentUser)
        // }else{
        //     updatedUsers = book.users.push(currentUser)
        // }


        let configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              users: updatedUsers
            })
          }

        fetch(`http://localhost:3000/books/${book.id}`, configObj)

    })

    // forEach()

    panel.append(h2, img, p, btn)
}

// async function readBook(book) {
	
// 	const response = await fetch('http://localhost:3000/books/' + book.id, {
// 		method: 'patch',
// 		headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify({
//                   users: book.users.push(currentUser) 
//                 })
//     })


//     fetch(`http://localhost:3000/books/${book.id}`, configObj)
    
//     let configObj = {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           users: currentusers
//         })
//       }

// 	const updatedBook = await response.json()

// 	return updatedBook
// }