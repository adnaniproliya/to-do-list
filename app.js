document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.querySelector('.task-list');
  
    let tasks = [];
  
    // Function to add a task
    const addTask = () => {
      const taskTitle = document.getElementById('task-title').value;
      const taskDesc = document.getElementById('task-desc').value;
      const taskDate = document.getElementById('task-date').value;
      const taskPriority = document.getElementById('task-priority').value;
  
      // Validate if the task title and date are provided
      if (taskTitle === "" || taskDate === "") {
        alert("Please enter both a task title and due date.");
        return;
      }
  
      const newTask = {
        title: taskTitle,
        description: taskDesc,
        date: taskDate,
        priority: taskPriority,
        completed: false
      };
  
      tasks.push(newTask);
      renderTasks();
      clearInputs();
    };
  
    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear the task list first
      
        tasks.forEach((task, index) => {
          const taskCard = document.createElement('div');
          taskCard.classList.add('task-card');
          
          // Add completed class if the task is completed
          if (task.completed) {
            taskCard.classList.add('completed');
          }
      
          taskCard.innerHTML = `
            <div class="task-info">
              <h3>${task.title}</h3>
              <p>${task.description}</p>
              <p>Due Date: ${task.date}</p>
              <p>Priority: ${task.priority}</p>
            </div>
            <div class="task-actions">
              <input type="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
              <button class="delete-btn" data-index="${index}">🗑️</button>
            </div>
          `;
      
          taskList.appendChild(taskCard);
        });
      
        // Attach event listeners for task deletion and checkbox
        document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', deleteTask);
        });
      
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          checkbox.addEventListener('click', toggleComplete);
        });
      };
      
  
    // Clear input fields after task submission
    const clearInputs = () => {
      document.getElementById('task-title').value = '';
      document.getElementById('task-desc').value = '';
      document.getElementById('task-date').value = '';
      document.getElementById('task-priority').value = 'low';
    };
  
    // Delete task function
    const deleteTask = (e) => {
      const index = e.target.getAttribute('data-index');
      tasks.splice(index, 1); // Remove task from array
      renderTasks();
    };
  
    // Toggle task completion
    const toggleComplete = (e) => {
        const index = e.target.getAttribute('data-index');
        tasks[index].completed = !tasks[index].completed; // Mark as complete/incomplete
        renderTasks();
    };
      
  
    // Attach the addTask function to the button click event
    addTaskBtn.addEventListener('click', addTask);
  });
  