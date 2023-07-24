
document.addEventListener("DOMContentLoaded", function () {
  
  let tasks = [];

  // Проверка наличия сохраненных данных в Local Storage при загрузке страницы
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }

  // Функция для сохранения данных в Local Storage
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      const task = {
        text: taskText.toUpperCase(),
        createdAt: new Date().toLocaleString(), 
        isEditing: false, 
      };

      tasks.push(task);
      renderTasks();

      taskInput.value = "";

      // После добавления задачи сохраняем данные в Local Storage
      saveTasksToLocalStorage();
    }
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();

    // После удаления задачи сохраняем данные в Local Storage
    saveTasksToLocalStorage();
  }

  function editTask(index) {
    tasks[index].isEditing = true;
    renderTasks();
  }

  function saveTask(index) {
    const taskText = document.getElementById(`editTask-${index}`).value.trim();
    tasks[index].text = taskText;
    tasks[index].isEditing = false;
    renderTasks();

    // После сохранения измененной задачи сохраняем данные в Local Storage
    saveTasksToLocalStorage();
  }

  function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      if (task.isEditing) {
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = task.text;
        editInput.id = `editTask-${index}`;
        li.appendChild(editInput);

        const saveButton = document.createElement("button");
        saveButton.textContent = "Зберегти";
        saveButton.addEventListener("click", () => saveTask(index));
        li.appendChild(saveButton);
      } else {
        li.textContent = `${task.text} (Створено: ${task.createdAt})`;

        const deleteButton = document.createElement("button");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "img/pngwing.com.png";
        deleteIcon.alt = "del-button";
        deleteIcon.classList.add("custom-icon");
        deleteButton.classList.add("custom-button");
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener("click", () => deleteTask(index));
        li.appendChild(deleteButton);
      }

      taskList.appendChild(li);
    });
  }

  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", addTask);

  const taskInput = document.getElementById("taskInput");
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  const searchImage = document.getElementById("searchImage");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  searchImage.addEventListener("click", toggleSearchInput);
  searchButton.addEventListener("click", searchTasks);

  function toggleSearchInput() {
    searchInput.style.display = searchInput.style.display === "none" ? "block" : "none";
  }

  function searchTasks() {
    const searchText = searchInput.value.trim().toUpperCase();

    if (searchText === "") {
      renderTasks();
    } else {
      const filteredTasks = tasks.filter(task => task.text.includes(searchText));
      renderFilteredTasks(filteredTasks);
    }
  }

  function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = `${task.text} (Створено: ${task.createdAt})`;

      const deleteButton = document.createElement("button");
      const deleteIcon = document.createElement("img");
      deleteIcon.src = "img/pngwing.com.png";
      deleteIcon.alt = "del-button";
      deleteIcon.classList.add("custom-icon");
      deleteButton.classList.add("custom-button");
      deleteButton.appendChild(deleteIcon);
      deleteButton.addEventListener("click", () => deleteTask(index));
      li.appendChild(deleteButton);

      taskList.appendChild(li);
    });
  }

  renderTasks();
});
