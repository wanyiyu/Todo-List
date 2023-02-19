let todoList = []
let nowTab = "";
const listbox = document.querySelector('.listbox');
const list = document.querySelector(".list");
const listNum = document.querySelector('.list_num');
function showTodo(filter) {
    if (todoList.length === 0) {
        listbox.hidden = true;
    } else {
        listbox.hidden = false;
    }
    let str = "";
    todoList.forEach(function (item, index) {
        let content = ` <label class="checkbox">
        <input type="checkbox" data-num="${index}" ${item.isCompleted}>
        <span class="todotext">${item.content}</span>
        <button class="delBtn" data-num="${index}"></button>
        </label>`;
        if (filter == "complete") {
            if (item.isCompleted === "checked") {
                str += content;
            }
        }
        else if (filter == "incomplete") {
            if (item.isCompleted === "") {
                str += content;
            }
        }
        else {
            str += content;
        }
    })
    list.innerHTML = str;
    updateTodoNum();
}
function updateTodoNum() {
    let itemNum = 0;
    todoList.forEach(function (item) {
        if (item.isCompleted != "checked") {
            itemNum++;
        }
    })
    listNum.innerHTML = `${itemNum}個待完成項目`;
}

//新增待辦
const addBtn = document.querySelector('.addBtn');
const todoNew = document.querySelector('.todoNew');
addBtn.addEventListener("click", function (e) {
    if (todoNew.value === "") {
        alert('您尚未輸入待辦事項！');
    }
    else {
        let addobj = {};
        addobj.content = todoNew.value;
        addobj.isCompleted = "";
        todoList.push(addobj);
        todoNew.value = "";
        showTodo(nowTab);
        saveList();
    }
})
todoNew.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addBtn.click();
    }
})

list.addEventListener("click", function (e) {
    //完成/取消完成待辦
    if (e.target.getAttribute("type") == "checkbox") {
        let index = e.target.getAttribute('data-num');
        if (e.target.checked) {
            todoList[index].isCompleted = "checked";
        }
        else {
            todoList[index].isCompleted = "";
        }
        updateTodoNum();
        saveList();
    }
    //刪除待辦
    if (e.target.getAttribute('class') == "delBtn") {
        let index = e.target.getAttribute('data-num');
        todoList.splice(index, 1);
        showTodo(nowTab);
        saveList();
    }
})

//清除所有完成項目
const cleanBtn = document.querySelector('.cleanBtn');
cleanBtn.addEventListener("click", function (e) {
    let cleanTodo = todoList.filter(function (item) {
        return item.isCompleted === "";
    })
    todoList = cleanTodo;
    showTodo(nowTab);
    saveList();
})

//篩選待辦
const listTab = document.querySelector(".list_tab");
const listTab2 = document.querySelectorAll(".tab_item");
listTab.addEventListener("click", function (e) {
    if (e.target.value === "待完成") {
        nowTab = 'incomplete';
        showTodo(nowTab);
        tabActive(1);
    } else if (e.target.value === "已完成") {
        nowTab = 'complete';
        showTodo(nowTab);
        tabActive(2);
    } else {
        nowTab = '';
        showTodo(nowTab);
        tabActive(0);
    }
})
function tabActive(num) {
    listTab2.forEach(function (item, index) {
        if (num == index) {
            listTab2[index].classList.add('active');
        } else {
            listTab2[index].classList.remove('active');
        }
    })
}

//記錄待辦
function saveList() {
    let saveData = JSON.stringify(todoList);
    localStorage.setItem('userList', saveData);
}
function init() {
    let getData = localStorage.getItem('userList');
    if (getData != null) {
        todoList = JSON.parse(getData);
    }
    showTodo(nowTab);
}
init();