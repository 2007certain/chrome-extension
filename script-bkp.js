"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const tabsContainer = document.getElementById('tabs');
    const taskListContainer = document.getElementById('task-list');
    const tasks = {};

    function renderTabs() {
        tabsContainer.innerHTML = '';
        Object.keys(tasks).forEach(listId => {
            const tab = document.createElement('div');
            tab.classList.add('tab');
            tab.textContent = `List ${listId}`;
            tab.addEventListener('click', () => showTaskList(listId));
            tabsContainer.appendChild(tab);
        });
    }

    function renderTaskList(listId) {
        const taskList = tasks[listId];
        taskListContainer.innerHTML = '';
        if (taskList && taskList.length > 0) {
            taskList.forEach((task, index) => {
                const taskItem = document.createElement('div');
                taskItem.textContent = task;
                const deleteButton = document.createElement('button');
                // deleteButton.textContent = 'Delete';
                deleteButton.innerHTML = `<svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
              </svg>`
                deleteButton.addEventListener('click', () => deleteTask(listId, index));
                taskItem.appendChild(deleteButton);
                taskListContainer.appendChild(taskItem);
            });
        } else {
            taskListContainer.textContent = 'No tasks in this list.';
        }
    }

    function showTaskList(listId) {
        renderTabs();
        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            activeTab.classList.remove('active');
        }
        const selectedTab = document.querySelector(`.tab:nth-child(${listId})`);
        selectedTab.classList.add('active');
        renderTaskList(listId);
    }

    function addTask(listId, task) {
        if (!tasks[listId]) {
            tasks[listId] = [];
        }
        tasks[listId].push(task);
        renderTabs();
        showTaskList(listId);
    }

    function deleteTask(listId, index) {
        if (tasks[listId] && tasks[listId][index]) {
            tasks[listId].splice(index, 1);
            renderTabs();
            showTaskList(listId);
        }
    }

    function createNewList() {
        const newListId = Object.keys(tasks).length + 1;
        tasks[newListId] = [];
        renderTabs();
        showTaskList(newListId);
    }

    createNewList();

    document.getElementById('new-list-button').addEventListener('click', createNewList);
    document.getElementById('add-task-button').addEventListener('click', function () {
        const listId = document.querySelector('.tab.active').textContent.replace('List ', '');
        const taskInput = document.getElementById('task-input');
        const task = taskInput.value.trim();
        if (task !== '') {
            addTask(listId, task);
            taskInput.value = '';
        }
    });

});