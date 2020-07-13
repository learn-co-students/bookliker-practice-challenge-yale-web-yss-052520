document.addEventListener("DOMContentLoaded", function () {

  const BOOKS_URL = "http://localhost:3000/books"
  const booksList = document.querySelector("ul#list")
  const showPanel = document.querySelector("div#show-panel")


  function addBook(book) {
    let li = document.createElement("li")
    li.innerText = book.title

    booksList.append(li)

    li.addEventListener("click", () => {

      showPanel.innerHTML = ""

      let title = document.createElement("h1")
      title.innerText = book.title

      let img = document.createElement("img")
      img.src = book.img_url

      let desc = document.createElement("p")
      desc.innerText = book.description

      let label = document.createElement("label")
      label.innerText = "Users who like this book:"

      let userList = document.createElement("ul")
      
      book.users.forEach((user) => {
        let li = document.createElement("li")
        li.innerText = user.username
        userList.append(li)
      })

      const user1 = {"id": 1, "username": "pouros"}
      let currentusers = book.users

      let btn = document.createElement('button')

      if (currentusers.find(user => user.username == "pouros" && user.id == 1)){
      btn.innerText = "Unlike Book"}
      else {
        btn.innerText = "Like Book"
      }
      
      btn.addEventListener('click', () => {

        if (currentusers.find(user => user.username == "pouros" && user.id == 1)){
          btn.innerText = "Like Book"
          currentusers.pop()

          let configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              users: currentusers
            })
          }

          fetch(`http://localhost:3000/books/${book.id}`, configObj)
          .then(() => {
            userList.removeChild(userList.lastChild)
          })
          

        } else {
          btn.innerText = "Unlike Book"
          currentusers.push(user1)
          console.log(currentusers)

          let configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              users: currentusers
            })
          }

          fetch(`http://localhost:3000/books/${book.id}`, configObj)
          .then(() => {          
            let li = document.createElement("li")
            li.innerText = user1.username
            userList.append(li)
          })
        
        }
          
      })
      
      showPanel.append(title, img, desc, btn, label, userList)


    })

  }

  function showBooks() {
      fetch(BOOKS_URL)
          .then(response => response.json())
          .then(function(json) {
              json.forEach(function(book) {
              addBook(book)
          });
      })
  }
  showBooks()

  
});
