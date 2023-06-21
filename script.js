const todoDiv = document.querySelector('.todo-list');
const addTaskBtn = document.querySelector('.add-task');
const taskInput = document.querySelector('.task-input');

let addTask = function (e) {
    e.preventDefault();
    if (taskInput.value.length === 0) {
        alert('Enter Task Name');
    } else {
        todoDiv.insertAdjacentHTML(`beforeend`, `
        <li class="task">
            <input type="checkbox" id="scales" name="task-name">
            <label for="task-name">
                    ${taskInput.value}
                </label>
        <button class="delete w-5\t">
            DEL
        </button>
    </li>
        `);
        let currentTasks = document.querySelectorAll('.delete');
        for (let i = 0; i <currentTasks.length; i++) {
            currentTasks[i].addEventListener('click', function () {
                this.parentNode.remove();
            })
        }
        document.querySelector('.task-input').value = '';
    }
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask(e);
    }
})

