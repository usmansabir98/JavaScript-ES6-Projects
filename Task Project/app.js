const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
  // load data event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear all tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

function createTask(text){
  const li = document.createElement('li');
    li.appendChild(document.createTextNode(text));
    li.className = 'collection-item';
  
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    link.setAttribute('href', '#');
    
    li.appendChild(link);
    taskList.appendChild(li);
}

function addTask(e){
  e.preventDefault();
  
  if(taskInput.value==='')
    alert('Add Task');

  else {
    createTask(taskInput.value);
    storeInLocalStorage(taskInput.value);
    taskInput.value = '';    
  }

  e.preventDefault();
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item'))
    e.target.parentElement.parentElement.remove();

    removeFromLocalStorage(e.target.parentElement.parentElement);
}

function clearTasks(){
  while(taskList.firstElementChild){
    taskList.firstElementChild.remove();
  }
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    if(task.firstChild.textContent.toLowerCase().indexOf(text)!=-1){
      task.style.display = 'block';
    }
    else{
      task.style.display = 'none';
    }
  });
}

function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    createTask(task);
  });
}

function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task)
      tasks.splice(index, 1);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  
}