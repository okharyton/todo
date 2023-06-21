const todoDiv = document.querySelector('.todo-list');
const addTaskBtn = document.querySelector('.add-task');
const taskInput = document.querySelector('.task-input');
const checkbox = document.querySelector('#checkbox');
const taskLabel = document.querySelector('.task-label');

console.log(checkbox)

let addTask = function (e) {
    e.preventDefault();
    if (taskInput.value.length === 0) {
        alert('Enter Task Name');
    } else {
        todoDiv.insertAdjacentHTML(`beforeend`, `
        <li class="task">
            <input type="checkbox" id="checkbox" name="task-name">
            <label class="task-label" for="task-name">
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

let greenStatus = function () {
    const listItem = this.closest('li');
    const taskLabel = listItem.querySelector('.task-label');

    if (this.checked) {
        taskLabel.style.backgroundColor = 'green';
    } else {
        taskLabel.style.backgroundColor = '';
    }
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask(e);
    }
});

document.addEventListener('change', function (e) {
    if (e.target.matches('.task input[type="checkbox"]')) {
        greenStatus.call(e.target);
    }
});

