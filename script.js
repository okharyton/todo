const todoDiv = document.querySelector('.todo-list');
const addTaskBtn = document.querySelector('.add-task');
const taskInput = document.querySelector('.task-input');
const checkbox = document.querySelector('#checkbox');
const taskLabel = document.querySelector('.task-label');
let editButtons = document.querySelectorAll('.edit');
const showCompletedTasksBtn = document.querySelector('.show-completed-tasks');
const showAllTasksBtn = document.querySelector('.show-all-tasks');

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
            <div class="buttons">
                <button class="edit">
                    <i class="fas fa-edit" style="color: #121212;"></i>
                </button>
                <button class="delete w-5">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </li>
`);
        let editButtons = document.querySelectorAll('.edit');
        editButtons.forEach(function (editButton) {
            editButton.addEventListener('click', editTask);
        });

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
        taskContainer.style.backgroundColor = '#2BAE66';
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

let editTask = function () {
    const taskContainer = this.closest('.task');
    const taskLabel = taskContainer.querySelector('.task-label');

    taskLabel.setAttribute('contenteditable', 'true');
    taskLabel.focus();
    taskLabel.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            taskLabel.blur();
        }
    });
    taskLabel.addEventListener('blur', function () {
        taskLabel.removeAttribute('contenteditable');
    });
};

let saveTask = function () {
    const taskContainer = this.closest('.task');
    const taskLabel = taskContainer.querySelector('.task-label');

    taskLabel.removeAttribute('contenteditable');
}

let showCompletedTasks = function () {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(function (task) {
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
};

let showAllTasks = function () {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(function (task) {
        task.style.display = 'block';
    });
};

editButtons.forEach(function (editButton) {
    editButton.addEventListener('click', editTask);
});
showCompletedTasksBtn.addEventListener('click', showCompletedTasks);
showAllTasksBtn.addEventListener('click', showAllTasks);