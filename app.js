class Bookmark{
    constructor(name,url){
        this.name=name
        this.url=url
    }
}

class Store{

    static getBookmarks(){
        let bookmarks
        if(localStorage.getItem("bookmarks")===null){
            bookmarks=[]
        }else{
            bookmarks=JSON.parse(localStorage.getItem("bookmarks"))
        }

        return  bookmarks
    }

    static addStoreBookmark(bookmark){
        const bookmarks=Store.getBookmarks()
        bookmarks.push(bookmark)
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    }

    static deleteStoreBookmark(name){
        const bookmarks=Store.getBookmarks()
        bookmarks.forEach((bookmark,index)=>{
            if(bookmark.name===name){
                bookmarks.splice(index,1)
            }
        })
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }
}

class UI{

    static displayBookmark(){

        const Bookmarks=Store.getBookmarks()

        Bookmarks.forEach((bookmak)=> UI.addBookmark(bookmak))
    }

   static addBookmark(bookmak){
        const li =document.createElement('li')
        const a =document.createElement('a')
        const button =document.createElement('button')
        button.className="delete"
        li.className="listItem"
        a.href=`${bookmak.url}`
        a.target="_blank"
        a.appendChild(document.createTextNode('visit'))
        button.appendChild(document.createTextNode('Delete'))
        li.appendChild(document.createTextNode(`${bookmak.name}`))
        li.appendChild(a)
        li.appendChild(button)
        document.getElementById("list-bookmark").appendChild(li)

    }
    static deleteBookmark(el){
        el.parentElement.remove()
    }
    static clear(){
        document.getElementById('name').value=""
        document.getElementById('url').value="" 
    }
}

document.addEventListener('DOMContentLoaded',UI.displayBookmark)

document.getElementById("getForm").addEventListener("submit",(e)=>{
    e.preventDefault();
    const name=document.getElementById('name').value
    const url=document.getElementById('url').value
    var regex=new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)
    if(name==="" || url===""){
        alert('please fill the field')
        return false;
    }else if(!url.match(regex)){
        alert('Url incorrect')
        return false;
    }
    const bookmark=new Bookmark(name,url)
    Store.addStoreBookmark(bookmark)
    UI.addBookmark(bookmark)
    UI.clear()
})

document.querySelector("ul").addEventListener("click",(e)=>{
    var lis=document.querySelectorAll("li")
    Array.from(lis).forEach((li)=>{
        UI.deleteBookmark(e.target)
        Store.deleteStoreBookmark(e.target.parentElement.firstChild.textContent)
    })
   
})

document.getElementById("search").addEventListener("input",searchBookmark)
function searchBookmark(){
    const searchTxt=document.getElementById("search").value
    var lis=document.querySelectorAll('li')
    Array.from(lis).forEach((li)=>{
        if(li.firstChild.textContent.indexOf(searchTxt) !=-1){
            li.style.display="block"
        }else{
            li.style.display="none" 
        }
    })
}   
