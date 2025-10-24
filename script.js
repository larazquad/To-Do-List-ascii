let tasks = [];

function addTask(){
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if(taskText === ''){
        alert('Por favor, digite uma tarefa!');
        return;
    }

    tasks.push({ 
        text: taskText, 
        completed: false,
        id: Date.now() 
    });
    
    taskInput.value = '';
    
    renderTasks();
    
    taskInput.focus();
}

function renderTasks(){
    const taskList = document.getElementById('taskList');

    taskList.innerHTML = '';
    
    if(tasks.length === 0){
        taskList.innerHTML = '<div class="empty-state">Nenhuma tarefa adicionada ainda. Comece adicionando uma acima!</div>';
        return;
    }
    
    tasks.forEach((task, index) =>{
    
        const li = document.createElement('li');

        if(task.completed){
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(${index})">
                ${task.text}
            </span>
            <div class="task-actions">
                <button class="remove-btn" onclick="removeTask(${index})">Remover</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    renderTasks();
}

function removeTask(index){
    if(confirm('Tem certeza que deseja remover esta tarefa?')){

        tasks.splice(index, 1);

        renderTasks();
    }
}

function updateStats(){
    const oldStats = document.querySelector('.stats');
    if(oldStats){
        oldStats.remove();
    }
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    const stats = document.createElement('div');
    stats.className = 'stats';
    stats.innerHTML = `
        <span>Total: ${totalTasks}</span>
        <span>Concluídas: ${completedTasks}</span>
        <span>Pendentes: ${pendingTasks}</span>
    `;
    
    const taskList = document.getElementById('taskList');
    taskList.parentNode.insertBefore(stats, taskList.nextSibling);
}

document.getElementById('taskInput').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        addTask();
    }
});

function clearAllTasks(){
    if(tasks.length === 0){
        alert('Não há tarefas para limpar!');
        return;
    }
    
    if(confirm('Tem certeza que deseja remover TODAS as tarefas?')){
        tasks = [];
        renderTasks();
    }
}

function addClearButton(){
    const inputContainer = document.querySelector('.input-container');
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Limpar Tudo';
    clearButton.onclick = clearAllTasks;
    clearButton.style.background = 'linear-gradient(135deg, #41C0AF 0%, #EF949C 100%)';
    inputContainer.appendChild(clearButton);
}

document.addEventListener('DOMContentLoaded', function(){
    renderTasks();
});

addClearButton();