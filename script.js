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
            <div class="task-input__container">
                <div class="task-line">
                    <input type="checkbox" id="checkbox" name="task-name">
                    <label class="task-label" for="task-name">
                        ${taskInput.value}
                    </label>
                </div>
                <button class="delete w-5">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </li>
        `);
        let currentTasks = document.querySelectorAll('.delete');
        for (let i = 0; i <currentTasks.length; i++) {
            currentTasks[i].addEventListener('click', function () {
                const taskContainer = this.closest('.task');
                taskContainer.style.backgroundColor = '';
                taskContainer.remove();
            })
        }
        document.querySelector('.task-input').value = '';
    }
}

let greenStatus = function () {
    const taskContainer = this.closest('.task');

    if (this.checked) {
        taskContainer.style.backgroundColor = 'green';
    } else {
        taskContainer.style.backgroundColor = '';
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

