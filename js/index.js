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

    let h2 = ce("h2")
    h2.innerText = book.title

    let img = ce("img")
    img.src = book.img_url

    let p = ce("p")
    p.innerText = book.description

    panel.append(h2, img, p)
}