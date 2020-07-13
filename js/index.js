let books_url = "http://localhost:3000/books";
let users_url = "http://localhost:3000/users";
let base_user;

document.addEventListener("DOMContentLoaded", () => {
    default_user();
    load_books();
    
});

function load_books(){
    fetch(books_url)
    .then(resp => resp.json())
    .then(books => {for (const book of books){
        add_to_DOM(book);
    }})
}

function add_to_DOM(book){
    let list_panel = qs("#list-panel");
    
    let new_book = ce("li");
    new_book.id = `book_${book.id}`;
    new_book.innerText = book.title;
    
    new_book.addEventListener("click", () => {
        let show_panel = qs("#show-panel");
        show_panel.innerText = "";
        
        let panel_div = ce("div");
        panel_div.id = `sp_${book.id}`

        let h1 = ce("h1");
        h1.innerText = book.title;

        let img = ce("img");
        img.src = book.img_url;
        
        let h2 = ce("h4");
        h2.innerText = book.description;
        
        let div = ce("div");
        div.id = "users"
        let h3 = ce("h3");
        h3.innerText = "Users who Liked the Book:"

        let users_div = ce("div");
        users_div.id = "users_list"
        
        for (const user of book.users){
            let p = ce("p");
            p.id = `user_${user.id}`;
            p.innerText = user.username;
            users_div.append(p);
        }

        div.append(h3, users_div);

        let btn = ce("button");
        let has_liked = is_liked(book);
        btn.innerText = has_liked ? "Unlike the Book :(" : "Like the Book!";
        btn.addEventListener("click", () => {
            like_book(book, has_liked)
            has_liked = is_liked(book);
            swap_text(has_liked);
        })
        
        panel_div.append(h1, img, h2, div, btn)
        show_panel.append(panel_div);
    })
    list_panel.append(new_book)
}

function like_book(book, has_liked){
    if (has_liked){
        book.users = book.users.filter(user => user.id !== base_user.id);
        
    } else{
        book.users.push(base_user);
    }

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "users" : book.users
        })
    }

    fetch(books_url+`/${book.id}`, configObj)
    .then(resp => resp.json())
    .then(updatedBook => {
        book = updatedBook;
        update_users(book);
    })
}

function swap_text(liked){
    let btn = qs("button");
    btn.innerText = liked ? "Unlike the Book :(" : "Like the Book!"
}

function update_users(book){
    let div = qs("#users_list");
    div.innerText = "";
    for (const user of book.users){
        let p = ce("p");
        p.id = `user_${user.id}`;
        p.innerText = user.username;
        div.append(p);
    }
}
function is_liked(book){
    let reducer = (is_in, user) => is_in || user.id == 1;
    return book.users.reduce(reducer, false);
}

function default_user(){
    fetch(users_url +`/1`)
    .then(resp => resp.json())
    .then(user => {base_user = user})
}

function qs(item){
    return document.querySelector(item);
}

function ce(item){
    return document.createElement(item);
}