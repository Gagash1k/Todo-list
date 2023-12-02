let toggleBulb = document.querySelector(".header__btn")
let bulb = document.querySelector(".header__bulb")
let body = document.querySelector("body")
let footer = document.querySelector("footer")
let addBtn = document.querySelector(".todo__form-add")
let input = document.querySelector(".todo__form input")
let todoContainer = document.querySelector(".todo__list")
let counterElement = document.querySelector(".todo__counter span")
let light = "dark"
let todoList = []

function renderList(){
    todoContainer.innerHTML = "";
    todoList.forEach((element,index) => {
        todoContainer.innerHTML +=  `<div class="${light == "dark"?"todo__item":"todo__item todo__active"}" data-item="${index}">
        <p>${element}</p>
        <button class="${light == "dark"?"delete":"delete delete-active"}"></button>
    </div>`
    })
    counterElement.innerHTML = todoList.length
}

toggleBulb.addEventListener("click", () => {
    if(light == "dark"){
        light = "white"
    }else{
        light = "dark"
    }
    saveData()
    changeLight()
})

function changeLight(){
    toggleBulb.classList.toggle("active__btn")
    bulb.classList.toggle("active__bulb")
    body.classList.toggle("active__body")
    footer.classList.toggle("footer__active")
    addBtn.classList.toggle("todo__active")
    let todoItem = document.querySelectorAll(".todo__item")
    let deleteBtn = document.querySelectorAll(".delete")
    if(todoItem){
        for (let i = 0; i < todoItem.length; i++) {
            todoItem[i].classList.toggle("todo__active")
            deleteBtn[i].classList.toggle("delete-active")
        }
    }
}

addBtn.addEventListener("click", () => {
    if (input.value == ""){
        input.placeholder = "You must write your todo"
        input.style.border = "1px solid red"
    }
    else{
        input.placeholder = "Write your todo please"
        input.style.border = "none"
        todoList.push(input.value)
        saveData()
        renderList()
        input.value = ""
    }
})

todoContainer.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON"){
        let parent = event.target.parentNode
        let index = parent.dataset.item
        todoList.splice(index,1)
        parent.remove()
    saveData()
    renderList()
    }
})

function saveData() {
    localStorage.setItem("todo-list", JSON.stringify(todoList))
    localStorage.setItem("light", JSON.stringify(light))
}

function getData() {
    let data = localStorage.getItem("todo-list")
    let dataLight = localStorage.getItem("light")
    if(data){
        todoList = JSON.parse(data)
    }
    if(dataLight){
        light = JSON.parse(dataLight)
    }
}

getData()

if(light == "white"){
    changeLight()
}

renderList()