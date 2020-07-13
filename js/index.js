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
}

function showBooks(books) {
	books.forEach(book => 
		appendBook(book)
		) 
}

