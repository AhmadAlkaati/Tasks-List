function main() {
  const taskInput = document.querySelector('.tasks-input-div input');
  const addTaskButton = document.querySelector('.tasks-input-div button');
  const filterInput = document.querySelector('.tasks-list-div input');
  const ul = document.querySelector('ul');
  const clearTasksBtn = document.querySelector('.tasks-list-div button');

  loadAllEventListeners();
  function loadAllEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    addTaskButton.addEventListener('click', addNewTask);
    clearTasksBtn.addEventListener('click', clearTasks);
    ul.addEventListener('click', removeTask);
    filterInput.addEventListener('keyup', filterTasks);
  }

  function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'delete';
      a.innerHTML = '<i class="fas fa-times"></i>';
      li.append(task);
      li.appendChild(a);
      ul.append(li);
    });
  }
  // Add new task to ui and to local storage //
  function addNewTask() {
    if (taskInput.value == '') {
      alert('Please fill required input');
    } else {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.innerHTML = '<i class="fas fa-times"></i>';
      a.className = 'delete';
      li.append(taskInput.value);
      li.appendChild(a);
      ul.append(li);

      storeTaskInLocalStorage(taskInput.value);
    }

    taskInput.value = '';
  }
  // Storing task in local storage//
  function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // removing task from ui and from local storage //
  function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete')) {
      e.target.parentElement.parentElement.classList.add('remove-task');
      removeTaskFromLS(e.target.parentElement.parentElement);
    }
  }
  // remove task from local storage //
  function removeTaskFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // clear all tasks from ui and local storage //
  function clearTasks() {
    // clear tasks from ui
    ul.innerHTML = '';
    clearTasksFromLocalStorage();
  }
  // Clear Tasks from LS
  function clearTasksFromLocalStorage() {
    localStorage.clear();
  }

  function filterTasks(e) {
    const smallLetter = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll('ul li');
    tasks.forEach((task) => {
      const item = task.firstChild.textContent;
      // search for first letter only. //
      if (item.toLowerCase().indexOf(smallLetter) == 0) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }
}

main();
