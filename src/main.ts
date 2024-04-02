import './style.css';

interface Todo {
    title: string;
    isCompleted: boolean;
    readonly id: string;
}

const todos: Array<Todo> = [];
const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const myForm = document.getElementById("myform") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const todo: Todo = {
        title: todoInput.value,
        isCompleted: false,
        id: String(Math.random() * 100),
    }
    todos.push(todo);
    todoInput.value = "";
    renderTodo(todos);
};

const generateTodoItem = (item: {
    title: string,
    isCompleted: boolean,
    id: string
}) => {

    const todo: HTMLDivElement = document.createElement("div");
    todo.className = "todo";

    // checkbox
    const checkBox: HTMLInputElement = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "isCompleted";
    checkBox.checked = item.isCompleted;
    checkBox.onchange = () => {
        todos.find(list => {
            if (list.id === item.id) list.isCompleted = checkBox.checked;
        })
        title.className = checkBox.checked ? "textCut" : "";
        if (checkBox.checked === true) {
            delButton.style.display = "block";
        } else {
            delButton.style.display = "none";
        }
    };

    // add paragraph tag
    const title: HTMLParagraphElement = document.createElement("p");
    title.innerText = item.title;
    title.className = checkBox.checked ? "textCut" : "";

    // added delete button
    const delButton: HTMLButtonElement = document.createElement("button");
    if (item.isCompleted === true) {
        delButton.style.display = "block";
    } else {
        delButton.style.display = "none";
    }
    delButton.innerText = "X";
    delButton.className = "deleteBtn";
    delButton.onclick = () => {
        const idx = todos.findIndex(list => list.id === item.id);
        todos.splice(idx, 1);
        renderTodo(todos);
    };

    // appending add to 
    todo.append(checkBox, title, delButton);
    todosContainer.appendChild(todo);

}

const renderTodo = (todos: Todo[]) => {
    todosContainer.innerText = "";
    todos.forEach(todo => {
        generateTodoItem(todo);
    })
}