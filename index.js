window.addEventListener("load", function() {
    const submitBtn = document.getElementById("submit")
    const loading = document.getElementById("loading")
    const btn = document.getElementById("cmnt")
    const edit = document.getElementById("editCmnt")
    btn.addEventListener("click", addComment)
    submitBtn.addEventListener("click", handleSubmit)
     getPosts()

})
var arr = []
const addComment = ()=> {
    const comment = document.getElementById("comments")
    arr.push(comment.value)
}
const handleSubmit = async (e) => {
    e.preventDefault()
    const book = document.getElementById("book")
    const author = document.getElementById("author")
    console.log(arr)
    const data = {
        book: book.value,
        author: author.value,
        comments: arr
    }
    const config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
    }
  return fetch("http://localhost:8000/posts", config)
  .then((res) => res.json())
   
}



// const setLoading = (isLoad) =>{
//    if(isLoad) {
//         loading.style.display= "block"
//    }
//    else {
//     loading.style.display= "none"
//    }
// }
const getPosts = () => {
    return fetch("http://localhost:8000/posts")
    .then((res) => res.json())
    .then(res=>display(res))
    setLoading(false)
}

function display(data) {
    const container = document.getElementById("container")
    container.innerHTML = ""
    console.log(data)
   data.map((item) => {
    console.log(item)

       const div1 = document.createElement("div");
       div1.innerHTML = "book: "+ item.book
       const div2 = document.createElement("div");
       div2.innerHTML = "Author: "+item.author
       var div = document.createElement("div")
       item.comments.map((comment,i) => {
         console.log(comment)
        let div1 = document.createElement("div");
         div1.innerHTML = "comment: "+ comment
         
         div1.setAttribute("contenteditable", true)
         const btnEdit = document.createElement("button")
         btnEdit.innerHTML = "Edit";
         div.append(div1, btnEdit)
       })

       container.append(div1, div2, div)
   })

}