document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTask(taskText);
        taskInput.value = ''; // Очистить поле ввода
    }
});

function addTask(taskText) {
    const taskList = document.getElementById('taskList');
    
    const li = document.createElement('li');
    
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('delete-button');
    
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li); // Удалить задачу из списка
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}