const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
const removeAddTasks = document.querySelector('#removeDoneTasks');
const removeDoneTasks = document.querySelector('#removeAddTasks');

// сохранение, создание массива
let tasks = [];

// вывод из local

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) {
    const classCss = task.done ? 'task-title task-title--done' : 'task-title';


    const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${classCss}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

    // вставляем в конец

    taskList.insertAdjacentHTML('beforeend', taskHtml);
})

// функции

addEmpty();

function addEmpty() {
    if (tasks.length === 0) {
        const emptyListHtml = `
				<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;

        taskList.insertAdjacentHTML('afterbegin', emptyListHtml);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}


function removeAll() {
    let remove = document.querySelectorAll('.list-group-item')
    remove.forEach(item => {
        item.remove();
    });

    tasks.splice(0, tasks.length);
    addEmpty();

    saveToLocalS();
}


function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        // ищем родителя элемента по которому нажали на кнопку


        // Добавляем класс
        const parentNode = event.target.closest('li');


        // добавляем в массив
        const id = Number(parentNode.id);

        const doneTask = tasks.find(function (task) {
            if (task.id === id) {
                return true;
            }
        });

        doneTask.done = !doneTask.done;

        parentNode.querySelector('.task-title').classList.toggle('task-title--done');
    }
    saveToLocalS()
}

function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {

        // ищем родителя элемента по которому нажали на кнопку
        const parentNode = event.target.closest('li');

        // удаляем из массива 
        const id = Number(parentNode.id);
        const index = tasks.findIndex(function (task) {
            return task.id === id
        });

        tasks.splice(index, 1);
        // удаляем
        parentNode.remove();
        addEmpty();
    }

    saveToLocalS()
}




// добавить задачу

form.addEventListener('submit', function (event) {
    // отменяем перезагрузку при отправке 
    event.preventDefault();
    let taskText = input.value;

    // объект с данными
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    // добавляем в массив

    tasks.push(newTask);
    const classCss = newTask.done ? 'task-title task-title--done' : 'task-title';


    const taskHtml = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item item">
					<span class="${classCss}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

    // вставляем в конец

    taskList.insertAdjacentHTML('beforeend', taskHtml);

    // очистка инпута и оставил фокус

    input.value = '';
    input.focus();

    // if (taskList.children.length > 1) {
    //     emptyList.classList.add('none');
    // }
    addEmpty();
    saveToLocalS()

})

// нажатие на кнопку которая меет дата атрибут с delete
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);


function saveToLocalS() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



removeAddTasks.addEventListener('click', removeAll);


removeDoneTasks.addEventListener('click', removeDone);

function removeDone() {
    if (tasks.length > 0) {
        tasks = tasks.filter(function (task) {
            return !task.done;
        });
        const doneTasks = document.querySelectorAll('.task-title--done');
        doneTasks.forEach(function (task) {
            task.closest('li').remove();

        });

        addEmpty();


        saveToLocalS();
    }

}

// 
