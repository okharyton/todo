class TodoList {
    constructor() {
        this.todoDiv = document.querySelector('.todo-list');
        this.addTaskBtn = document.querySelector('.add-task');
        this.taskInput = document.querySelector('.task-input');
        this.showCompletedTasksBtn = document.querySelector('.show-completed-tasks');
        this.showAllTasksBtn = document.querySelector('.show-all-tasks');
        this.tasks = [];
        this.loadTasksFromLocalStorage();
        this.addEventListeners();
        this.renderTasks();
    }

    addEventListeners() {
        this.addTaskBtn.addEventListener('click', this.addTask.bind(this));
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask(e);
            }
        });
        this.showCompletedTasksBtn.addEventListener('click', this.showCompletedTasks.bind(this));
        this.showAllTasksBtn.addEventListener('click', this.showAllTasks.bind(this));
    }

    addTask(e) {
        e.preventDefault();
        if (this.taskInput.value.length === 0) {
            alert('Enter Task Name');
        } else {
            const taskName = this.taskInput.value;
            const task = {
                id: Date.now(),
                name: taskName,
                completed: false
            };
            this.tasks.push(task);
            this.saveTasksToLocalStorage();
            this.renderTask(task);
            this.taskInput.value = '';
        }
    }

    renderTask(task) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task';
        taskItem.innerHTML = `
      <div class="task__container">
        <div class="task-line">
          <input type="checkbox" name="task-name" ${task.completed ? 'checked' : ''}>
          <label class="task-label" data-task-id="${task.id}">${task.name}</label>
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
    `;

        const deleteButton = taskItem.querySelector('.delete');
        deleteButton.addEventListener('click', () => {
            this.deleteTask(task.id);
        });

        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            this.toggleTaskCompleted(task.id);
        });

        const editButton = taskItem.querySelector('.edit');
        editButton.addEventListener('click', () => {
            this.editTask(task.id);
        });

        this.todoDiv.appendChild(taskItem);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    toggleTaskCompleted(taskId) {
        const task = this.tasks.find((task) => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasksToLocalStorage();
        }
    }

    editTask(taskId) {
        const task = this.tasks.find((task) => task.id === taskId);
        if (task) {
            const taskLabel = document.querySelector(`[data-task-id="${taskId}"]`);

taskLabel.contentEditable = true;
taskLabel.focus();
            taskLabel.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    taskLabel.blur();
                }
            });

            taskLabel.addEventListener('blur', () => {
                taskLabel.contentEditable = false;
                task.name = taskLabel.textContent;
                this.saveTasksToLocalStorage();
            });
        }}
    showCompletedTasks() {
        const completedTasks = this.tasks.filter((task) => task.completed);
        this.renderTasks(completedTasks);
    }
    showAllTasks() {
        this.renderTasks();
    }
    saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }
    renderTasks(tasks = this.tasks) {
        this.todoDiv.innerHTML = '';
        tasks.forEach((task) => {
            this.renderTask(task);
        });
    }
}
const todoList = new TodoList();
